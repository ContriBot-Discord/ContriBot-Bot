import { Guild } from "./Guild";
import { UserItem } from "@/classes/UserItem";

export class User{
    guild: Guild;
    id: string;
    points: number;
    allPoints: number;
    lang: string;
    inventory: UserItem[];

    constructor(
        guild: Guild,
        id: string,
        points: number = 0,
        allPoints: number = 0,
        lang: string,
        inventory: UserItem[] = []
    ){
        this.guild = guild;
        this.id = id
        this.points = points;
        this.allPoints = allPoints;
        this.lang = lang;
        this.inventory = inventory;
    }

    update(): void{
        // Update user in database
        // This should send all the data to the database
    }


}