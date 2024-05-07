import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecintosModule } from './recintos/recintos.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot('mongodb+srv://arpanet80:Dante2011@clusterdespliegue.jmodcqi.mongodb.net/despliegueted'),
    MongooseModule.forRoot( process.env.MONGODB),
    RecintosModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {

  
  //// eso olo para ver que las variables de entorno se cargan
  // constructor() {
  //   console.log(process.env);
  // }
}
