import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tecnico } from './entities/tcnicosmongo.entity';
import { Recinto } from './entities/recintosmongo.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { GpsPoit, PointDocument } from './entities/gps-point.entity';
import { CreateGpsPointDto } from './dto/create-gpspoit.dto';
// import { JwtService } from '@nestjs/Jwt';

@Injectable()
export class RecintosService {
  
  constructor(
    @InjectModel(Recinto.name) private recintoModel: Model<Recinto>,
    @InjectModel(Tecnico.name) private tecnnicoModel: Model<Tecnico>,
    @InjectModel(GpsPoit.name) private gpspointModel: Model<PointDocument>,
    // private jwtSvc: JwtService
  ) {}


   //////////////// PARA MOVIL //////////////////////////
   async findUsuario(createUsuarioDto: CreateUsuarioDto): Promise<any> {

    const tecnico = await this.tecnnicoModel.findOne({usuario: createUsuarioDto.usuario, password: createUsuarioDto.password, activo: true});
    tecnico.idRol = 1;
    if (tecnico) {
      const payload = { sub: tecnico.idpersonal, nombres: tecnico.nombre, cedula: tecnico.cedula, cargo: tecnico.cargo, grupoactivo: tecnico.grupoactivo, idRol: tecnico.idRol  }
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsIm5vbWJyZXMiOiJEQU5URSBJQkFORVogTUFSVElORVoiLCJjZWR1bGEiOiIzOTgxNzY3IiwiY2FyZ28iOiJQT1IgR0VTVElPTkFSIiwiZ3J1cG9hY3Rpdm8iOjUsImlkUm9sIjoxLCJpYXQiOjE3MTY5OTI0OTQsImV4cCI6MTc0ODUyODQ5NH0.1DD-li-BOZf94f-XepkzkfhKDOa8Ug13VuKY-hlCsQ8"
      // return { 
      //   token: await this.jwtSvc.signAsync(payload)
      // };
      return { token: jwt, idUsuario: tecnico.idpersonal, nombres: tecnico.nombre, cargo: tecnico.cargo,grupoactivo: tecnico.grupoactivo, idrol: tecnico.idRol };
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

  async findPersonalData(idpersonal: number): Promise<Tecnico> {
    
    const tecnico = await this.tecnnicoModel.findOne({idpersonal: idpersonal});
    const recintos = await this.recintoModel.find({ activo: true, grupodespliegue: tecnico.grupoactivo});
    
    tecnico.recintos = recintos;
    
    return tecnico;
  }

  async findTecnicos(): Promise<Tecnico[]> {
    
    return await this.tecnnicoModel.find({activo: true});
        
  }

  /*
  create(createRecintoDto: CreateRecintoDto) {
    return 'This action adds a new recinto';
  }

  findAll() {
    return `This action returns all recintos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recinto`;
  }

  update(id: number, updateRecintoDto: UpdateRecintoDto) {
    return `This action updates a #${id} recinto`;
  }

  remove(id: number) {
    return `This action removes a #${id} recinto`;
  }

  */
}
