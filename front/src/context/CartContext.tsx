"use client"

import { Product } from "@/interfaces/IProduct"
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AutContext";

interface CartContextProps {

    cartItems: Product[]; // STATE QUE ALMACENA LOS PRODUCTOS EN EL CARRITO
    addToCart: (product: Product) => void; // FUNCION PARA AÑADIR PRODUCTOS AL CARRITO
    removeFromCart: (productId: number) => void; // FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO
    clearCart: () => void; // FUNCION PARA LIMPIAR EL CARRITO
    getTotalPrice: () => number; // FUNCION PARA OBTENER EL PRECIO TOTAL DE LOS PRODUCTOS EN EL CARRITO
    getIdItems: () => number[]; // FUNCION PARA OBTENER LOS IDS DE LOS PRODUCTOS EN EL CARRITO (trampa)
    getItemsCount: () => number; // FUNCION PARA OBTENER LA CANTIDAD DE PRODUCTOS EN EL CARRITO
    descuentoMonto: () => void

}

const CartContext = createContext<CartContextProps>({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    getTotalPrice: () => 0,
    getIdItems: () => [],
    getItemsCount: () => 0,
    descuentoMonto: () => { }

});

interface CartProvider {
    children: React.ReactElement;
}

export const CartProvider: React.FC<CartProvider> = ({ children }) => {
    const { dataUser, isLoadingUser } = useAuth()
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        if (cartItems.length > 0) { localStorage.setItem('cart', JSON.stringify(cartItems)); }
    }, [cartItems]);


    useEffect(() => {
        //se encarga de extraer la informacion del localStorage cuando se recarga la pagina y almacenar en el estado
        if (typeof window !== 'undefined' && window.localStorage) {
            const cartInfo = localStorage.getItem('cart');
            if (cartInfo) {
                setCartItems(JSON.parse(cartInfo));
            }
        }
    }, []);


    useEffect(() => {
        if (isLoadingUser) return;

        // Si el usuario se desloguea → limpiar carrito
        if (!dataUser) {
            setCartItems([]);
            localStorage.removeItem('cart');
        }
    }, [dataUser]);


    const addToCart = (product: Product) => {
        if (!dataUser) {
            alert("debes estar logueado.");
            return;
        }

        const productexists = cartItems.some((item) => item.id === product.id);
        if (productexists) {
            alert("El producto ya está en el carrito.");
            return;
        }
        setCartItems((prevItems) => [...prevItems, product]);
        alert("Producto agregado al carrito ✔️")

    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    }

    const clearCart = () => {
        setCartItems([]);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('cart');
        }

    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const getIdItems = () => {
        return cartItems.map((item) => item.id);
    }

    const getItemsCount = () => {
        return cartItems.length;
    }

    const descuentoMonto = () => {
        if (getTotalPrice() >= 200) {
            alert("vas a tener un descuento")
        }

    }



    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice, getIdItems, getItemsCount, descuentoMonto }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
