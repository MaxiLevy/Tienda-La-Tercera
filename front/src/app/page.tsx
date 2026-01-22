import ProductCard from "../components/ProductCard";
import { getAllProductsService } from "@/services/products.services";
import CarouselClient from "@/components/CarouselClient";

const Home = async () => {

  const allProducts = await getAllProductsService()

  return (
    <div>
      <CarouselClient />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {allProducts &&
          allProducts.map((product) => {
            return <ProductCard product={product} key={product.name} />
          })}
      </section>
    </div>
  );
}

export default Home;