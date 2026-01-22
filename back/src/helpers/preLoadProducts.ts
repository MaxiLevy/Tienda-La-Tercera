import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "Pelota Adidas Al Rihla Qatar 2022",
    description:
      "Pelota oficial del Mundial Qatar 2022. La Al Rihla simboliza el viaje y la unión del fútbol mundial. Su diseño aerodinámico ofrece precisión, velocidad y estabilidad en cada disparo.",
    price: 120,
    stock: 20,
    image:
      "https://i.pinimg.com/736x/dc/8c/d2/dc8cd20e204181feda97133eaef73b7c.jpg",
    categoryId: 1,
  },
  {
    name: "Camiseta Argentina Campeón del Mundo 2022",
    description:
      "Camiseta oficial Adidas de la Selección Argentina Campeón del Mundo. Diseño clásico con las tres estrellas y escudo dorado conmemorativo del título mundial en Qatar.",
    price: 150,
    stock: 15,
    image:
      "https://www.mezzalacamisetas.com.ar/wp-content/uploads/2023/02/1-1.png",
    categoryId: 2,
  },
  {
    name: "Copa del Mundo Réplica Oficial",
    description:
      "Réplica exacta de la Copa del Mundo FIFA, con detalles dorados y base verde, símbolo eterno de la gloria argentina en 2022.",
    price: 95,
    stock: 10,
    image:
      "https://i.pinimg.com/736x/e3/21/22/e32122fa01bbfd72682f9c8f28b88f6b.jpg",
    categoryId: 3,
  },
  {
    name: "Camiseta Messi 10 Qatar 2022",
    description:
      "Camiseta Adidas oficial de Lionel Messi usada durante la final de la Copa del Mundo Qatar 2022. Con el número 10 ",
    price: 160,
    stock: 12,
    image:
      "https://acdn-us.mitiendanube.com/stores/001/312/744/products/uyuiuiuiuiuiuiiuuuuuuuuuuuuuuuuuuu1-e517a536bf02b9ecd416733640525446-480-0.webp",
    categoryId: 4,
  },
  {
    name: "Botines Adidas X Speedportal Messi",
    description:
      "Botines edición especial usados por Lionel Messi en la final del Mundial 2022. Diseño liviano, con placa de velocidad y ajuste perfecto para máxima agilidad.",
    price: 220,
    stock: 9,
    image:
      "https://elmarketingdeportivo.com/wp-content/uploads/2022/11/Captura-de-Pantalla-2022-11-19-a-las-10.25.22-a.-m..png",
    categoryId: 5,
  },
  {
    name: "Short Oficial Argentina Qatar 2022",
    description:
      "Short oficial de la Selección Argentina usado durante el Mundial de Qatar. Con escudo bordado, cintura elástica y tecnología Aeroready.",
    price: 75,
    stock: 18,
    image:
      "https://media2.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/s/h/short-de-argentina-adidas-oficial-blanco-100020hk8071001-1.jpg",
    categoryId: 6,
  },
  {
    name: "Medias Oficiales Argentina 2022",
    description:
      "Medias oficiales Adidas de Argentina Qatar 2022. Con soporte en el arco, amortiguación estratégica y detalles celestes clásicos.",
    price: 35,
    stock: 25,
    image:
      "https://production.cdn.vaypol.com/variants/8j98wpkygfjzgvnquo34etznvl92/e82c8d6171dd25bb538f2e7263b5bc7dfc6a79352d85923074be76df53fbc6f4",
    categoryId: 7,
  },
  {
    name: "Poster Oficial Argentina Campeón 2022",
    description:
      "Poster conmemorativo oficial de la Selección Argentina Campeón del Mundo 2022. Diseño vibrante con imágenes icónicas del torneo y el título.",
    price: 50,
    stock: 25,
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd/d085bb161178603.63c099dcc97a5.jpg",
    categoryId: 8,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
