import { IsNumber, IsOptional, IsString, IsBoolean, IsDate } from 'class-validator';

export class CreateRecintosmongoDto {
    @IsString()
    departamento: string;

    @IsString()
    circunscripcion: string;

    @IsString()
    provincia: string;
    
    @IsString()
    municipio: string;
    
    @IsString()
    asiento: string;

    @IsString()
    zona: string;

    @IsString()
    distrito: string;

    @IsString()
    recinto: string;

    @IsString()
    direccion: string;

    @IsString()
    latitud: string;

    @IsString()
    longitud?: string;

    @IsNumber()
    idproceso: number;

    @IsNumber()
    mesas: number;
    
    @IsNumber()
    grupodespliegue: number;
    
    @IsNumber()
    codimporte: number

    @IsOptional()
    @IsDate()
    fechaimportacion: Date;
    
    @IsOptional()
    @IsBoolean()
    desplegado: boolean;
    
    @IsOptional()
    @IsBoolean()
    activo: boolean;
}
