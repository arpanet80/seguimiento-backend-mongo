import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Recinto } from "./recintosmongo.entity";

// export type CatDocument = HydratedDocument<Recinto>;

@Schema()
export class Tecnico {

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

    @Prop()
    recintos?: Recinto[];

    @Prop()
    usuario: string;

    @Prop()
    password: string;

    @Prop()
    idrol: number;

}

export const TecnicoSchema = SchemaFactory.createForClass(Tecnico);
