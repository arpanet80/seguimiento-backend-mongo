import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateGpsPointDto {
    
    @IsNumber()
    idUsuario: number
    
    @IsNumber()
    latitud: number;

    @IsNumber()
    longitud: number;

}
