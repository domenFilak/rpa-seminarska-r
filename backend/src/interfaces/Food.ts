import { Branch } from "./Branch";

export interface Food {
    id: string;
    name: string;
    cookTime: string;
    price: number;
    favourite: boolean;
    origins: string[];
    imageUrl: string;
    tags: string[];
    lang: string;
    branches: Branch[]; //mongoose model iz podatkovne baze dobi array in ne array tipa branch => ce rabis kje bi moral narediti conversion ...as Branch[]
}