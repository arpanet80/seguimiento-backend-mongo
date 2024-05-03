import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tecnico } from './entities/tcnicosmongo.entity';
import { Recinto } from './entities/recintosmongo.entity';

@Injectable()
export class RecintosService {

  constructor(
    @InjectModel(Recinto.name) private recintoModel: Model<Recinto>,
    @InjectModel(Tecnico.name) private tecnnicoModel: Model<Tecnico>
  ) {}


   //////////////// PARA MOVIL //////////////////////////
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
