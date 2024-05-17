import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Usuario {

    @Prop()
    usuario: string

    @Prop()
    password: string;

    @Prop()
    abstract: boolean;

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
