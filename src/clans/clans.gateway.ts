import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {ClansService} from "./clans.service";
import {SendClanMessageDto} from "./dtos/send-clan-message.dto";

@WebSocketGateway()
export class ClansGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly clansService: ClansService
    ) {
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('clans/msgToServer')
    handleMessage(client: Socket, payload: SendClanMessageDto): void {
        this.server.emit('clans/msgToClient', payload);
    }

    afterInit(server: Server) {

    }

    handleDisconnect(client: Socket) {

    }

    handleConnection(client: Socket, ...args: any[]) {

    }
}
