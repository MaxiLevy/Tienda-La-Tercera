import LoginForm from '@/components/LoginForm'
import React from 'react'

const LoginPage = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">

            <section className="w-full max-w-md bg-blue-400 shadow-lg rounded-2xl p-8 border border-gray-200">

                <h1 className="text-center text-white mb-6 font-bold text-[24px]">
                    Bienvenido 👋
                </h1>

                <LoginForm />

                <div className="mt-6 text-center">
                    <a
                        href="/register"
                        className="text-white bold font-medium hover:underline"
                    >
                        ¿No tenés cuenta? Crear una
                    </a>
                </div>
            </section>

        </div>
    );
};

export default LoginPage;
