export interface Product {
    quantity: string | number | readonly string[] | undefined;
    imageUrl: string;
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

