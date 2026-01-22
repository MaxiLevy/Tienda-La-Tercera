import RegisterForm from "@/components/RegisterForm"

const RegisterPage = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">

            <section className="w-full max-w-md bg-blue-400 shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    Crear Cuenta
                </h1>

                <p className="text-center text-white mb-6 font-bold">
                    Unite y se parte de los campeones del mundo ⭐
                </p>


                <RegisterForm />

                <div className="mt-6 text-center">
                    <a
                        href="/login"
                        className="text-purple-600 font-medium hover:underline"
                    >
                        ¿Ya tenés una cuenta? Iniciar sesión
                    </a>
                </div>
            </section>

        </div>
    );
};

export default RegisterPage;



