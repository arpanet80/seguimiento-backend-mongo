import { IsDate, IsNumber, IsOptional, IsString, isNumber, isPort } from 'class-validator';

export class SeguimientoRecintoDto {
    
    @IsNumber()
    idUsuario: number
    
    @IsNumber()
    cidestino: number;

    @IsString()
    codigoticequipo: string;

    @IsNumber()
    idrecinto: number;

    @IsNumber()
    estado: number;
    
    @IsNumber()
    idproceso: number;

}

export class SeguimientoRecintoLogDto {
    
    @IsNumber()
    idUsuario: number
    
    @IsNumber()
    cidestino: number;

    @IsString()
    codigoticequipo: string;

    @IsNumber()
    idrecinto: number;

    @IsNumber()
    estado: number;
    
    @IsNumber()
    idproceso: number;

}
