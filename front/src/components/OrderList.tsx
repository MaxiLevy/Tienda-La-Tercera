"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AutContext";
import { getAllOrders } from "@/services/orders.services";
import { Order } from "@/interfaces/orders.interface";
import { useRouter } from "next/navigation";


function OrderList() {
    const { dataUser, loading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()


    useEffect(() => {
        const fetchOrders = async () => {
            if (!dataUser?.token) {
                setOrders([]);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const ordersResponse = await getAllOrders(dataUser?.token);
                setOrders(ordersResponse);
            } catch (error) {
                console.error("Error al traer la info:", error);
                setError("no pudimos cargar las ordenes");
                setOrders([]);
            } finally {
                setIsLoading(false);
            }

        }
        fetchOrders();
    }, [dataUser?.token]);

    useEffect(() => {
        if (!loading && !dataUser?.token) {
            router.push("/login");
        }
    }, [loading, dataUser]);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">


            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>


            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 text-sm underline hover:no-underline"
                    >
                        Reintentar
                    </button>
                </div>
            )}


            {isLoading ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Cargando órdenes...</p>
                </div>
            ) : orders && orders.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-text-sm text-left">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Productos</th>
                                <th className="px-4 py-2">Estado</th>
                                <th className="px-4 py-2">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{order.id}</td>
                                    <td className="px-4 py-3">
                                        {order.products?.length || 0} productos
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                            {order.status || "Procesada"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(order.date || Date.now()).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No hay órdenes para mostrar.</p>
                </div>
            )}
        </div>
    )
}

export default OrderList
