import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SeguimDocument = SeguimientoRecinto & Document       // Para que nos de los metodos de save update etc
@Schema()
export class SeguimientoRecinto {

    @Prop()
    idUsuario: number

    @Prop()
    cidestino: number;

    @Prop()
    codigoticequipo: string;

    @Prop()
    idrecinto: number;

    @Prop()
    idproceso: number;

    // @Prop({ type: Number, default: 0 })
    @Prop()
    estado: number;             // 0 = pendiente, 1 = Entregado, 2 = Recogido

    @Prop({ type: Date, default: new Date() })
    timestamp: Date;

}

export const SeguimientoRecintoSchema = SchemaFactory.createForClass(SeguimientoRecinto);


export type SeguimLogDocument = SeguimientoRecinto & Document       // Para que nos de los metodos de save update etc
@Schema()
export class SeguimientoRecintoLog {

    @Prop()
    idUsuario: number

    @Prop()
    cidestino: number;

    @Prop()
    codigoticequipo: string;

    @Prop()
    idrecinto: number;

    @Prop()
    idproceso: number;

    @Prop()
    estado: number;             // 0 = pendiente, 1 = Entregado, 2 = Recogido

    @Prop({ type: Date, default: new Date() })
    timestamp: Date;

}

export const SeguimientoRecintoLogSchema = SchemaFactory.createForClass(SeguimientoRecinto);
