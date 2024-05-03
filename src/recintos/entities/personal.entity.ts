import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// export type CatDocument = HydratedDocument<Recinto>;

@Schema()
export class Personal {
    @Prop()
    idpersonal: number

    @Prop()
    nombre: string;

    @Prop()
    cedula: string;

    @Prop()
    cargo: string;

    @Prop()
    grupoactivo: number;

    @Prop({ default: true })
    activo: boolean;

}

export const PersonalSchema = SchemaFactory.createForClass(Personal);
