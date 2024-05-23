import { Timestamp } from 'rxjs';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tecnico } from './entities/tcnicosmongo.entity';
import { Recinto } from './entities/recintosmongo.entity';
import { Usuario } from './entities/usuario.entity';
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

    if (tecnico) {
      const payload = { sub: tecnico.idpersonal, nombres: tecnico.nombre, cedula: tecnico.cedula, cargo: tecnico.cargo, grupoactivo: tecnico.grupoactivo  }
      // const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW50ZS5pYmFuZXoiLCJpZFVzdWFyaW8iOiIxIiwibm9tYnJlcyI6IkRhbnRlIE1hcnTDrW4gSWJhw7FleiBNYXJ0aW5leiIsInNpc3RlbWEiOiJDb250cmF0YWNpb25lcyIsImlkUm9sIjoiMSIsInNlY2Npb24iOiJTZWNjacOzbiBkZSBUw6ljbm9sb2dpYXMiLCJjYXJnbyI6IkluZnJhZXN0cnVjdHVyYSB5IFNvcG9ydGUgVGVjbmljbyIsIm51bVJvbGVzIjoiMSIsImV4cCI6MTcxNTk2Mjc3OCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzExMy8iLCJhdWQiOiJKQ2VydGlmaWNhY2lvblVzZXJzIn0.HNU-Wmpu8o8a8AwFz0VGUsJcGCPTYZC-dEcKMQzeTy4"
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYW9sYS5yb2RyaWd1ZXoiLCJpZFVzdWFyaW8iOiIxMSIsIm5vbWJyZXMiOiJQYW9sYSBSb2RyaWd1ZXogVXJxdWl6dSIsInNpc3RlbWEiOiJDb250cmF0YWNpb25lcyIsImlkUm9sIjoiMSIsInNlY2Npb24iOiJBcG95byBTYWxhIFBsZW5hIiwiY2FyZ28iOiJTZWNyZXRhcmlhIGRlIFByZXNpZGVuY2lhIiwibnVtUm9sZXMiOiIxIiwiZXhwIjoxNzE2NTM2NzYxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTEzLyIsImF1ZCI6IkpDZXJ0aWZpY2FjaW9uVXNlcnMifQ.JwHw8WEaaDx6FbdlKt_LnA_xztdXfOLKxyaQZU0QB9o";
      /*return { 
        token: await this.jwtSvc.signAsync(payload)
      };*/
      return { token: jwt};
    }
    else
      throw new NotFoundException('Error en el proceso de login...');

      // return null;

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
