import { IsNumber, IsOptional, IsString, IsBoolean, IsDate, IsArray } from 'class-validator';
import { Recinto } from '../entities/recintosmongo.entity';

export class CreateTecnicoMongoDto {

    @IsNumber()
    idpersonal: number
    
    @IsString()
    nombre: string;

    @IsString()
    cedula: string;

    @IsString()
    cargo: string;
    
    @IsNumber()
    grupoactivo: number;
    
    @IsOptional()
    @IsString()
    usuario: string;
    
    @IsOptional()
    @IsString()
    password: string;
    
    @IsOptional()
    @IsArray()
    recintos?: Recinto[];


    
}
