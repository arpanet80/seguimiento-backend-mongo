import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';


/////////////////////////////////////////////////////////////////////
/////     https://www.youtube.com/watch?v=xJ7s7xVr5o8       /////////
/////////////////////////////////////////////////////////////////////
@WebSocketGateway({
  cors: { origin: '*' },
})
export class SocketGateway implements OnModuleInit{

  @WebSocketServer()
  public server: Server;

  constructor(private readonly socketService: SocketService) {}

  onModuleInit() {
   
    this.server.on('connection', (socket: Socket) => {

      const { name, token } = socket.handshake.auth;
      if ( !token ) {
        socket.disconnect();
        return;
      }
      // console.log({ name, token });

      // Agregar cliente al listaod
      this.socketService.onClientConnected( { idUsuario: socket.id, nombre: name});

      // Mensaje de bienvenida
      // socket.emit('welcome-message', 'Binevenido al servidor');
      
      // Listado de clientes conectados
      this.server.emit('on-clients-changed', this.socketService.getClients() );

      socket.on('disconnect', () => {
        this.socketService.onClientDisconnected( socket.id );
        this.server.emit('on-clients-changed', this.socketService.getClients() );
        // console.log('Cliente desconectado: ', socket.id);
      })
      
    });


  }

  
  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {

    const { name, token } = client.handshake.auth;
    console.log({name, message});

    if ( !message ) {
      return;
    }

    this.server.emit(
      'on-message',
      {
        userId: client.id,
        message: message,
        name: name,
      }
    )
  }

  
}
