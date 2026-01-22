import { Product } from "@/interfaces/IProduct";
import Link from "next/link";

interface CardProps {
    product: Product;
}

const ProductCard = ({ product }: CardProps) => {
    return (
        <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
            <div className="w-full h-60 flex items-center justify-center bg-white rounded mb-4 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-56 object-contain"
                />
            </div>
            <Link href={`product/${product.id}`} className="text-lg font-semibold mb-2" >{product.name}</Link>
            <p className="text-sm mb-2 text-gray-700">{product.description}</p>
            <p className="text-lg font-semibold text-gray-900">${product.price}</p>
        </div >
    );
};

export default ProductCard;