export class Food{
    id!: string;
    name!: string;
    price!: number;
    tags?: string[];
    favourite!: boolean;
    imageUrl!: string;
    origins!: string[];
    cookTime!: string;
    lang!: string;
    branches?: { branch: string, stock: number }[];
}