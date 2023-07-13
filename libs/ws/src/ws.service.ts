/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from 'socket.io'

import { Injectable } from '@nestjs/common'
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class WsService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  afterInit(server: any): void {
    console.log('-------------------Websocket Server is started-------------------')
  }

  handleConnection(client: any, ...args: any[]): void {
    console.log(`Websocket Client ${client.id} is connected`)
  }

  handleDisconnect(client: any): void {
    console.log(`Websocket Client ${client.id} is disconnected`)
  }
}
