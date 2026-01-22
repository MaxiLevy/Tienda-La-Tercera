import { Product } from "@/interfaces/IProduct";
import { notFound } from "next/navigation";
import { getProductByIdService } from "@/services/products.services";
import ButtonAddToCart from "../../../components/ButtonAddToCart";

interface ProductDetailProps {
    params: {
        idProduct: string;
    }
}


const ProductDetailPage = async ({ params }: ProductDetailProps) => {
    const { idProduct } = params;

    let productData: Product;

    try {
        productData = await getProductByIdService(idProduct);
    } catch (error) {
        console.log(error)
        notFound();
    }

    return (
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        <img className="w-full dark:hidden"
                            src={productData.image}
                            alt="" />

                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1
                            className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                        >
                            {productData.name}
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p
                                className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                            >
                                {productData.price && `$${productData.price.toFixed(2)}`}
                            </p>
                        </div>

                        <ButtonAddToCart product={productData} />


                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            {productData.description}
                        </p>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetailPage;
