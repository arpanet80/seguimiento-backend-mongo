import { Module } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { RecintosController } from './recintos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recinto, RecintoSchema } from './entities/recintosmongo.entity';
import { Tecnico, TecnicoSchema } from './entities/tcnicosmongo.entity';
import { GpsPoit, GpsPoitSchema } from './entities/gps-point.entity';
// import { JwtModule } from '@nestjs/Jwt';
// import { jwtConstants } from './jwt-constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recinto.name, schema: RecintoSchema }]),
    MongooseModule.forFeature([{ name: Tecnico.name, schema: TecnicoSchema }]),
    MongooseModule.forFeature([{ name: GpsPoit.name, schema: GpsPoitSchema }]),
    MongooseModule.forFeature([{ name: GpsPoit.name, schema: GpsPoitSchema }]),

    /////////////////////////////////////////////////////////////////////
    /// AL HACER BUILD EN DOCKER DA ERROR:
    /// error: Cannot find module '@nestjs/Jwt' or its corresponding type declarations
    /////////////////////////////////////////////////////////////////////
    /// import { JwtModule } from '@nestjs/Jwt';
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: {expiresIn: '365d'}
    // }),

  ],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [RecintosService],
})
export class RecintosModule {}
