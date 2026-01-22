"use client";
import { NavItems } from '@/utils/Navitems'
import Link from 'next/link'
import { useAuth } from '../context/AutContext';

const NavBar = () => {
    const { dataUser, logout } = useAuth();

    return (
        <div>
            <section>
                <nav className='bg-blue-400 p-4 flex justify-between items-center'>

                    <h1 className="mx-2 font-semibold text-white p-2 rounded-md flex items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtjFYYrijRT2MJVbavJqc5lMgq9PGcKsXXIg&s"
                            alt="La Tercera logo"
                            className="h-8 w-8 mr-2 rounded-md"
                        />
                        La Tercera
                    </h1>


                    {NavItems.map((navigationItem) => (
                        <Link
                            key={navigationItem.id}
                            href={navigationItem.route}
                            className='mx-2 font-semibold text-white p-2 rounded-md hover:scale-110 transition-all'
                        >
                            {navigationItem.nameToRender}
                        </Link>
                    ))}

                    {dataUser ? (
                        <div className="flex items-center gap-4">


                            <div className="flex flex-col items-center -mr-3 text-white">
                                <span>👤</span>
                                <span className="text-sm font-semibold">
                                    {dataUser.user.name}
                                </span>
                            </div>


                            <button
                                onClick={logout}
                                className='mx-2 font-semibold text-white p-2 rounded-md hover:scale-110 transition-all'
                            >
                                ➜] logout
                            </button>
                        </div>
                    ) : (

                        <Link
                            href="/login"
                            className='mx-2 font-semibold text-white p-2 rounded-md hover:scale-110 transition-all'
                        >
                            Login
                        </Link>
                    )}

                </nav>
            </section>
        </div>
    )
}

export default NavBar;
