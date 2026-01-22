import { Product } from "@/interfaces/IProduct";

export const getAllProductsService = async () => {
    try {
        const response = await fetch('http://localhost:3001/products', { method: "GET" });
        const products: Product[] = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}



export const getProductByIdService = async (id: string) => {
    try {
        const allProducts = await getAllProductsService();
        const product = allProducts.find((product) => product.id === Number(id))
        if (!product) {
            throw new Error('no se encontro el producto con ese ID');
        }
        return product;
    } catch (error: any) {
        throw new Error(error);

    }
}