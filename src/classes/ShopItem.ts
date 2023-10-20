import {Guild} from "@/classes/Guild";

export class ShopItem{
    price: number;
    name: string;
    description: string;
    id: string;
    guild: Guild;
    max_quantity: number;
    action: number;
    available: boolean;
    availableAfter: Date;
    availableBefore: Date;
    restockDuration: number;

    constructor(
        price: number,
        name: string,
        description: string,
        id: string,
        guild: Guild,
        max_quantity: number,
        action: number,
        available: boolean,
        availableAfter: Date,
        availableBefore: Date,
        restockDuration: number
    ){
        this.price = price;
        this.name = name;
        this.description = description;
        this.id = id;
        this.guild = guild;
        this.max_quantity = max_quantity;
        this.action = action;
        this.available = available;
        this.availableAfter = availableAfter;
        this.availableBefore = availableBefore;
        this.restockDuration = restockDuration;
    }


}