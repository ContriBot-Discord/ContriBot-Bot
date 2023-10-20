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

    getUser(id: string): User{
        // Get a user from the database
        // If the user does not exist, create it and return it
        let user = this.users.find(user => user.id === id);

        if (user == undefined) {
            user = this.createUser(id);
        }

        return user
    }

    createUser(id: string): User{

        // Create a guild in the database
        // Since Database is not configured yet, return a new guild
        let user = new User(this, id, 0, 0, this.lang);

        // The .update method sends data to the database.
        // With that, we can make sure that the user is created in the database
        user.update();

        // Once created, we add the user to the guilds array
        this.users.push(user);

        // And return it
        return user;

    }

    update(): void{
        // Update guild in database
        // This should send all the data to the database
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