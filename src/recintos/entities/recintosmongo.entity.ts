import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// export type CatDocument = HydratedDocument<Recinto>;
export type RecintoDocument = Recinto & Document       // Para que nos de los metodos de save update etc

@Schema()
export class Recinto {
    id: number;

    @Prop()
    departamento: string;

    @Prop()
    circunscripcion: string;

    @Prop()
    provincia: string;

    @Prop()
    municipio: string;

    @Prop()
    asiento: string;

    @Prop()
    zona: string;

    @Prop()
    distrito: string;

    @Prop()
    recinto: string;

    @Prop()
    direccion: string;

    @Prop()
    latitud: string;

    @Prop()
    longitud?: string;

    @Prop({ default: Date.now() })
    fechaimportacion: Date;

    @Prop()
    idproceso: number;

    @Prop()
    idrecinto: number;

    @Prop()
    codimporte: number;

    @Prop({ default: false })
    desplegado: boolean;

    @Prop()
    mesas: number;
    
    @Prop()
    grupodespliegue: number;
    
    @Prop({ default: true })
    activo: boolean;

}

export const RecintoSchema = SchemaFactory.createForClass(Recinto);
