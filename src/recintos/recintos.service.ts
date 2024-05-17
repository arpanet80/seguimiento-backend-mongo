import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tecnico } from './entities/tcnicosmongo.entity';
import { Recinto } from './entities/recintosmongo.entity';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class RecintosService {

  constructor(
    @InjectModel(Recinto.name) private recintoModel: Model<Recinto>,
    @InjectModel(Tecnico.name) private tecnnicoModel: Model<Tecnico>,
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>
  ) {}


   //////////////// PARA MOVIL //////////////////////////
   async findUsuario(createUsuarioDto: CreateUsuarioDto): Promise<any> {

    console.log(createUsuarioDto);
    
    const usr = await this.usuarioModel.findOne({usuario: createUsuarioDto.usuario, password: createUsuarioDto.password, activo: true});

    if (usr) {
      // return "Token";
      const llave = "Aquientra el token"
      return { token: llave};
    }
    else
      return null;

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
