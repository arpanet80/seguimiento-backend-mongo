import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PointDocument =GpsPoit & Document       // Para que nos de los metodos de save update etc
@Schema()
export class GpsPoit {

    @Prop()
    idUsuario: number

    @Prop()
    latitud: number;

    @Prop()
    longitud: number;

    @Prop()
    timestamp: Date;

}

export const GpsPoitSchema = SchemaFactory.createForClass(GpsPoit);
