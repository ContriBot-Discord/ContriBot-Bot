import { User } from "./User";
import {ShopItem} from "@/classes/ShopItem";

export class Guild{
    id: string;
    lang: string;
    users: User[];
    shop: ShopItem[];

    constructor(
        id: string,
        lang: string,
    ){
        this.id = id;
        this.lang = lang;
        this.shop = this.fetchShop();
        this.users = this.fetchUsers();
    }

    fetchUsers(): User[]{
        // Fetch all users from database

        // Since Database is not configured yet, return empty array
        return [];
    }

    fetchShop(): ShopItem[]{
        // Fetch all shop items from database

        // Since Database is not configured yet, return empty array
        return [];

    }

}