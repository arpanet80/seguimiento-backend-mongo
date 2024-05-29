import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecintosModule } from './recintos/recintos.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './socket/socket.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecintosModule,
    // MongooseModule.forRoot('mongodb+srv://arpanet80:Dante2011@clusterdespliegue.jmodcqi.mongodb.net/despliegueted'),
    MongooseModule.forRoot( process.env.MONGODB),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {

  
  //// eso olo para ver que las variables de entorno se cargan
  // constructor() {
  //   console.log(process.env);
  // }
}
