import { Injectable } from '@nestjs/common';

interface Client {
    idUsuario: string;
    nombre: string
}

@Injectable()
export class SocketService {

    private clients: Record<string, Client> = {};

    onClientConnected(client: Client) {

        this.clients [ client.idUsuario ] = client;

    }

    onClientDisconnected(idUsuario: string) {

        delete this.clients [ idUsuario ];
      
    }

    getClients() {
        
        return Object.values(this.clients);
    }

}
