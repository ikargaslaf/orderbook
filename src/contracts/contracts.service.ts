import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { Contracts, Events } from './contracts.enum';
import OrderControllerAbi from "./ABI/OrderController.json"

@Injectable()
export class ContractsService {

    private provider: ethers.JsonRpcProvider
    private orderbookSC: ethers.Contract

    constructor() {

        this.provider = new ethers.JsonRpcProvider(
            createAlchemyWeb3(process.env.PROVIDER).currentProvider as any
        )

        this.orderbookSC = new ethers.Contract(
            process.env.ORDER as string,
            OrderControllerAbi,
            this.provider,
        );

    }

    async startListener(eventName: string) {
        this.orderbookSC.on(eventName, async (...args: any) => {
          const event = args[args.length - 1];
          await this.eventActions(eventName, [event]);
        });
    }


    async eventActions(eventName: string, event: any) {

        const actionMenu = {}

        // actionMenu[Events.ORDER_CREATED] = this.createOrder() //fix
        // actionMenu[Events.ORDER_CANCELLED] = this.cancelOrder() //fix
        // actionMenu[Events.ORDER_MATCHED] = this.matchOrder() //fix
        
        await actionMenu[eventName]

    }

}
