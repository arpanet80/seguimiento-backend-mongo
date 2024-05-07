import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecintosService } from './recintos.service';


@Controller('recintos')
export class RecintosController {
  constructor(private readonly recintosService: RecintosService) {}

  @Get(':idpersonal')
  findPersonalData(@Param('idpersonal') idpersonal: number) {
    return this.recintosService.findPersonalData(+idpersonal);
  }


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