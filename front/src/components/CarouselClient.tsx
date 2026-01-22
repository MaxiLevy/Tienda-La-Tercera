"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
    "/images/campeonesdelmundo.jpg",
    "/images/dibuFinal.jpg",
    "/images/obeliscoCampeon.jpg",


];

export default function CarouselClient() {
    const [current, setCurrent] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[550px] overflow-hidden  shadow-lg">
            {images.map((src, index) => (
                <Image
                    key={index}
                    src={src}
                    alt={`Foto ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
            <div className="absolute left-6 bottom-6 text-white"> <h2 className="text-xl md:text-3xl font-bold drop-shadow-lg">Argentina — Campeón del Mundo</h2> <p className="text-sm md:text-base drop-shadow-lg">Recuerdos del Mundial 2022</p> </div>
        </div>
    );
}
