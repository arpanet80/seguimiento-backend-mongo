import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecintosService } from './recintos.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateGpsPointDto } from './dto/create-gpspoit.dto';


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

  @Get('/tecnicos/todos')
  findTecnicos() {
    return this.recintosService.findTecnicos();
  }


  /*
  @Get('/usuarios/:usuario/:password')
  findUsuario(@Param('usuario') usuario: string, @Param('password') password: string) {
    return this.recintosService.findUsuario(usuario, password);
  }
*/

/*  
  @Post()
  create(@Body() createRecintoDto: CreateRecintoDto) {
    return this.recintosService.create(createRecintoDto);
  }

  @Get()
  findAll() {
    return this.recintosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recintosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecintoDto: UpdateRecintoDto) {
    return this.recintosService.update(+id, updateRecintoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recintosService.remove(+id);
  }

  */

}
