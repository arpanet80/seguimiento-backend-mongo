import { Module } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { RecintosController } from './recintos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recinto, RecintoSchema } from './entities/recintosmongo.entity';
import { Tecnico, TecnicoSchema } from './entities/tcnicosmongo.entity';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { GpsPoit, GpsPoitSchema } from './entities/gps-point.entity';
import { JwtModule } from '@nestjs/Jwt';


@Module({
  imports: [

    JwtModule.register({
      global: true,
      secret: 'jwt-secret',
      signOptions: {expiresIn: '30d'}
    }),

    MongooseModule.forFeature([{ name: Recinto.name, schema: RecintoSchema }]),
    MongooseModule.forFeature([{ name: Tecnico.name, schema: TecnicoSchema }]),
    MongooseModule.forFeature([{ name: GpsPoit.name, schema: GpsPoitSchema }])
  ],
  controllers: [RecintosController],
  providers: [RecintosService],
})
export class RecintosModule {}
