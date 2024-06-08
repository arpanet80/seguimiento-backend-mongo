import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tecnico, TecnociConResumen } from './entities/tcnicosmongo.entity';
import { Recinto, RecintoDocument } from './entities/recintosmongo.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { GpsPoit, PointDocument } from './entities/gps-point.entity';
import { CreateGpsPointDto } from './dto/create-gpspoit.dto';
import { SeguimientoRecintoDto } from './dto/seguimiento-recinto.dto';
import { SeguimDocument, SeguimLogDocument, SeguimientoRecinto, SeguimientoRecintoLog } from './entities/seguimiento-recinto.entity';
// import { JwtService } from '@nestjs/Jwt';

@Injectable()
export class RecintosService {
  
  constructor(
    @InjectModel(Recinto.name) private recintoModel: Model<RecintoDocument>,
    @InjectModel(Tecnico.name) private tecnnicoModel: Model<Tecnico>,
    @InjectModel(GpsPoit.name) private gpspointModel: Model<PointDocument>,
    @InjectModel(SeguimientoRecinto.name) private seguimientoRecintoModel: Model<SeguimDocument>,
    @InjectModel(SeguimientoRecintoLog.name) private seguimientoRecintoLogModel: Model<SeguimLogDocument>,
    // private jwtSvc: JwtService
  ) {}


   //////////////// PARA MOVIL //////////////////////////
   async findUsuario(createUsuarioDto: CreateUsuarioDto): Promise<any> {

    const tecnico = await this.tecnnicoModel.findOne({usuario: createUsuarioDto.usuario, password: createUsuarioDto.password, activo: true});
    if (tecnico) {
      const payload = { sub: tecnico.idpersonal, nombres: tecnico.nombre, cedula: tecnico.cedula, cargo: tecnico.cargo, grupoactivo: tecnico.grupoactivo, idRol: tecnico.idrol  }
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsIm5vbWJyZXMiOiJEQU5URSBJQkFORVogTUFSVElORVoiLCJjZWR1bGEiOiIzOTgxNzY3IiwiY2FyZ28iOiJQT1IgR0VTVElPTkFSIiwiZ3J1cG9hY3Rpdm8iOjUsImlkUm9sIjoxLCJpYXQiOjE3MTY5OTI0OTQsImV4cCI6MTc0ODUyODQ5NH0.1DD-li-BOZf94f-XepkzkfhKDOa8Ug13VuKY-hlCsQ8"
      // return { 
      //   token: await this.jwtSvc.signAsync(payload)
      // };
      return { token: jwt, idUsuario: tecnico.idpersonal, nombres: tecnico.nombre, cargo: tecnico.cargo,grupoactivo: tecnico.grupoactivo, idrol: tecnico.idrol };
    }
    else
      throw new NotFoundException('Error en el proceso de login...');
  }

  async createPoint(createGpsPointDto: CreateGpsPointDto): Promise<GpsPoit> {
    
    try {

      const newPunto = new this.gpspointModel(createGpsPointDto);
      newPunto.timestamp  = new Date(Date.now());
      // console.log("========> ", newPunto);

      return await newPunto.save();
      
    } catch (error) {
      throw new HttpException('Error  interno de servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  
  async findGpsPoints(idusuario: number): Promise<GpsPoit[]> {

    try {

      const puntos = await this.gpspointModel.find({idUsuario: idusuario}).sort({ timestamp: -1 }).limit(50);   // Los ultimos 20

      return puntos;

    } catch (error) {
      throw new HttpException('Error interno de servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
       
  }

  async findPersonalData(idpersonal: number): Promise<Tecnico> {
    
    const tecnico = await this.tecnnicoModel.findOne({idpersonal: idpersonal});
    const recintos = await this.recintoModel.find({ activo: true, grupodespliegue: tecnico.grupoactivo});
    
    tecnico.recintos = recintos;
    
    return tecnico;
  }

  async findTecnicos(): Promise<Tecnico[]> {
    
    return await this.tecnnicoModel.find({activo: true});
        
  }

  
  async createSeguimientoRecinto(seguimientoRecintoDto: SeguimientoRecintoDto): Promise<SeguimientoRecinto> {
    
    try {

      const newSeg = new this.seguimientoRecintoModel(seguimientoRecintoDto);
      const newSegLog = new this.seguimientoRecintoLogModel(seguimientoRecintoDto);
      await newSegLog.save();

      const seguim = await this.seguimientoRecintoModel.findOne({idrecinto: newSeg.idrecinto});  
      if (seguim) {
        seguim.estado = newSeg.estado;
        return await seguim.save();

      } else {
        return await newSeg.save();
      }

      // newSeg.timestamp  = new Date(Date.now());

            
    } catch (error) {
      throw new HttpException('Error  interno de servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  
  async findSeguimientoRecintoGetEstado(idrecinto: number): Promise<any> {

    try {

      const seguim = await this.seguimientoRecintoModel.findOne({idrecinto: idrecinto});
      
      return { estado: seguim.estado }
      
    } catch (error) {
      throw new HttpException('Error interno de servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
        
  }

  

  async obtenerIdsRecintos(grupo: number): Promise<number[]> {
    const recintosTodos = await this.recintoModel.find({grupodespliegue: grupo,activo: true});
    return recintosTodos.map(recinto => Number( recinto.idrecinto) );
  }

  async comparaRecintoTecnicoConSeguimiento(idrecintoTecnico: number, seguimientoRecinto: SeguimientoRecinto[]): Promise<any> {

    seguimientoRecinto.find(x => x.idrecinto)
    if (seguimientoRecinto) 
      return true;
    else
      return false
  }
        
  async findTecnicosConResumen(): Promise<any> {
          
    try {
      const tecnicosTodos = await this.tecnnicoModel.find({activo: true});
      const recintosTodos = await this.recintoModel.find({activo: true});
      const seguimientoRecinto = await this.seguimientoRecintoModel.find();

      const entregadosTotal = seguimientoRecinto.filter(x => x.estado == 1).length;
      const recogidosTotal = seguimientoRecinto.filter(x => x.estado == 2).length;

      
      /// Recorre todos los tecnicos
      for (let tecnico in tecnicosTodos) {

        let entregado = 0;
        let recogido = 0;

        //// Recorre todos los recintos del tecnico
        tecnicosTodos[tecnico]["recintos"].forEach(element => {
          
          /// Busca si existe el recinto en la tabla de seguimiento
          let seg = seguimientoRecinto.find(x => x.idrecinto == element.id)
          
          if (seg) {
            if (seg.estado == 1.) 
              entregado++;
            else
              recogido++;
          }
          
        });

        tecnicosTodos[tecnico]["recintosentregado"] = entregado;
        tecnicosTodos[tecnico]["recintosrecogido"] = recogido;
        
      }

      const tecnicosResumen: TecnociConResumen = {
        recintosTotal: recintosTodos.length,
        recintosEntregado: entregadosTotal,
        recintosRecoger: recogidosTotal,
        tenicos: tecnicosTodos
      }

      return tecnicosResumen;

    } catch (error) {
      throw new HttpException('Error interno de servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
       
  }




}
