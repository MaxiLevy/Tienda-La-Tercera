import { Product } from "./IProduct";

export interface Order {
    id: number;
    products: Product[];
    date: string;
    status: string;
}