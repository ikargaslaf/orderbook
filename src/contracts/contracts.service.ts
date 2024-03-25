import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ethers, Contract } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';
import { Event } from './contracts.enum';
import { OrderControllerAbi } from './ABI/OrderController';
import { OrdersService } from 'src/orders/orders.service';
import { toCreateOrderDto, toMatchedOrderDto } from './contracts.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContractsService implements OnApplicationBootstrap {

    private provider: ethers.providers.JsonRpcProvider
    private orderbookSC: ethers.Contract

    constructor(
        private orderService: OrdersService,
        private configService: ConfigService
    ) {

        this.provider = new ethers.providers.JsonRpcProvider(
            this.configService.get<string>('PROVIDER')
        )

        this.orderbookSC = new ethers.Contract(
            this.configService.get<string>('ORDER_CONTROLLER'),
            OrderControllerAbi,
            this.provider,
        );

        this.startListener(Event.ORDER_CREATED)
        this.startListener(Event.ORDER_CANCELLED)
        this.startListener(Event.ORDER_MATCHED)

    }

    async onApplicationBootstrap() {

        const eventCollection = await this.getEventsFromBlock(
            this.configService.get<number>('DEPLOY_BLOCKNUMBER'),
            this.orderbookSC,    
        )

        for (let i = 0; i < eventCollection.length; ++i) {
            await this.eventActions(eventCollection[i].name, eventCollection[i]);
        }
    }

    async startListener(eventName: string) {
        this.orderbookSC.on(eventName, async (...args: any) => {
            const event = args[args.length - 1];
            await this.eventActions(eventName, event);
        });
    }


    async eventActions(eventName: string, event: any) {

        //const actionMenu = {}

        // actionMenu[Event.ORDER_CREATED] = this.orderService.create(toCreateOrderDto(event))
        // actionMenu[Event.ORDER_MATCHED] = this.orderService.match(toMatchedOrderDto(event))
        // actionMenu[Event.ORDER_CANCELLED] = this.orderService.cancel(event.args.id.toString())

        // await actionMenu[eventName]()

        //badcode
        switch (eventName) { 
            case Event.ORDER_CREATED:
                await this.orderService.create(toCreateOrderDto(event))
                break;
            case Event.ORDER_MATCHED:
                await this.orderService.match(toMatchedOrderDto(event))
                break;
            case Event.ORDER_CANCELLED:
                await this.orderService.cancel(event.args.id.toString())
                break;
        }
    }

    async getEventsFromBlock(
        blockNumber: number,
        contract: Contract,
        eventName?: string
    ) {

        const topics = [];

        if (!(eventName === undefined)) {
            topics.push(contract.interface.getEventTopic(eventName!));
        }

        const filter = {
            address: contract.address,
            fromBlock: blockNumber,
            toBlock: 'latest',
            topics: topics,
        };

        const logs = await this.provider.getLogs(filter);

        const parsedLogs = logs.map(log => {
            const event: LogDescription & { blockNumber?: number } =
                contract.interface.parseLog(log);
            event.blockNumber = log.blockNumber;
            return event;
        });

        return parsedLogs;
    };

}
