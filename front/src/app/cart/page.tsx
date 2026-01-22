"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AutContext";
import { createOrder } from "@/services/orders.services";
import { useEffect } from "react";



const CartPage = () => {

    const { cartItems, clearCart, getIdItems, getItemsCount, removeFromCart, getTotalPrice, descuentoMonto } =
        useCart();

    const { dataUser } = useAuth();

    useEffect(() => {
        if (getTotalPrice() >= 200) {
            alert("vas a tener un descuento")
        } else {
            alert("si pasas los 200 tenes descuento, agregate algo")
        }
    }, [])

    const handleCheckout = async () => {
        if (!dataUser?.token) {
            alert("Debes iniciar sesión para completar la compra.");
            return;
        }
        if (cartItems.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        try {
            await createOrder(getIdItems(), dataUser.token);
            clearCart();
            alert("Compra realizada con éxito.");
        } catch (error) {
            console.error("Error en la compra:", error);
            alert("Ocurrió un error al procesar la compra. Inténtalo de nuevo.");
        }
    };

    return (
        <section className="bg-white py-8 antialiased dark:bg-blac md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-blac dark:text-white sm:text-2xl">
                    Carrito de compras ({getItemsCount()})
                </h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">

                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-lg border border-blac bg-white p-4 shadow-sm dark:border-blac dark:bg-blac md:p-6"
                                    >
                                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

                                            <a href={`/product/${item.id}`} className="shrink-0 md:order-1">
                                                <img
                                                    className="h-20 w-20 object-cover rounded-lg dark:hidden"
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                                <img
                                                    className="hidden h-20 w-20 object-cover rounded-lg dark:block"
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </a>


                                            <div className="flex items-center justify-between md:order-3 md:justify-end">

                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold text-blac dark:text-white">
                                                        {`$${Number(item.price ?? 0).toFixed(2)}`}
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <a href={`/product/${item.id}`} className="text-base font-medium text-blac hover:underline dark:text-white">
                                                    {item.name}
                                                </a>
                                                <div className="flex items-center gap-4">

                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className=" cursor-pointer inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                    >
                                                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-blac dark:text-blac border border-blac rounded-lg">
                                    Tu carrito está vacío.
                                </div>
                            )}


                        </div>
                    </div>


                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-blac bg-white p-4 shadow-sm dark:border-blac dark:bg-blac sm:p-6">
                            <p className="text-xl font-semibold text-blac dark:text-white">Resumen de compra</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-blac dark:text-blac">Total Productos</dt>
                                        <dd className="text-base font-medium text-blac dark:text-white">{getItemsCount()} {""}</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-blac pt-3 dark:border-blac">
                                    <dt className="text-base font-bold text-blac dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-blac dark:text-white">${getTotalPrice()}{""}</dd>
                                </dl>
                            </div>


                            <button
                                onClick={handleCheckout}
                                type="button"
                                disabled={cartItems.length === 0}
                                className="cursor-pointer flex w-full items-center justify-center bg-blue-400 hover:bg-blue-500 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                {!dataUser ? 'Iniciar sesión para comprar' : 'Finalizar compra'}
                            </button>

                            <div className="flex items-center justify-center gap-2">
                                <a href="/" className="text-sm font-medium text-primary-700 hover:underline dark:text-primary-500">
                                    o Continuar Comprando
                                </a>
                            </div>
                        </div>
                        <button
                            onClick={clearCart}
                            className="cursor-pointer flex w-full items-center justify-center bg-blue-400 hover:bg-blue-500 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300">
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </section >
    );
};


export default CartPage;