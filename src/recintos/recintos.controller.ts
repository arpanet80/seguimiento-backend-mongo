import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateGpsPointDto } from './dto/create-gpspoit.dto';
import { SeguimientoRecintoDto } from './dto/seguimiento-recinto.dto';


@Controller('recintos')
export class RecintosController {
  constructor(private readonly recintosService: RecintosService) {}

  @Get(':idpersonal')
  findPersonalData(@Param('idpersonal') idpersonal: number) {
    return this.recintosService.findPersonalData(+idpersonal);
  }

  @Post('/usuarios')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.recintosService.findUsuario(createUsuarioDto);
  }

  @Post('/gpspoint')
  createPoint(@Body() createGpsPointDto: CreateGpsPointDto) {
    return this.recintosService.createPoint(createGpsPointDto);
  }

  @Get('gpspoint/:idusuario')
  findGpsPoints(@Param('idusuario') idusuario: number) {
    return this.recintosService.findGpsPoints(+idusuario);
  }


  @Get('/tecnicos/todos')
  findTecnicos() {
    return this.recintosService.findTecnicos();
  }


  @Get('tecnicos/conresumen')
  findTecnicosConResumen() {
    return this.recintosService.findTecnicosConResumen();
  }

    @Post('/seguimiento')
  createSeguimientoRecinto(@Body() seguimientoRecintoDto: SeguimientoRecintoDto) {
    return this.recintosService.createSeguimientoRecinto(seguimientoRecintoDto);
  }

  @Get('seguimiento/estado/:idrecinto')
  findSeguimientoRecintoGetEstado(@Param('idrecinto') idrecinto: number) {
    return this.recintosService.findSeguimientoRecintoGetEstado(+idrecinto);
  }

  

}
