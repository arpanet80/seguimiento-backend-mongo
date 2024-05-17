import { Module } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { RecintosController } from './recintos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recinto, RecintoSchema } from './entities/recintosmongo.entity';
import { Tecnico, TecnicoSchema } from './entities/tcnicosmongo.entity';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recinto.name, schema: RecintoSchema }]),
    MongooseModule.forFeature([{ name: Tecnico.name, schema: TecnicoSchema }]),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }])
  ],
  controllers: [RecintosController],
  providers: [RecintosService],
})
export class RecintosModule {}
