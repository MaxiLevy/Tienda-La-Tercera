"use client";
import { useFormik } from "formik";
import { initialValuesLogin, LoginFormValuesInterface, LoginSchema } from "@/validators/LoginSchema";
import { loginUserService } from "@/services/aut.services";
import { useAuth } from "../context/AutContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter()

    const { setDataUser } = useAuth();

    const formik = useFormik<LoginFormValuesInterface>({
        initialValues: initialValuesLogin,
        validationSchema: LoginSchema,
        onSubmit: async (values, { resetForm }) => {

            try {
                const response = await loginUserService(values);

                // Guardar usuario en contexto
                setDataUser(response);

                console.log('sesion iniciada', response);

                // ✔ Si existe token => login exitoso
                if (response?.token) {
                    router.push("/"); // redirige al home
                }

                resetForm();

            } catch (error) {
                console.error(error);
            }
        }
    }
    )
    return (
        <div className="bg-blue-400 flex justify-center items-center h-full" >
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white ">Email</label>
                    <input className="bg-white" type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email ? <p className="text-red-700">{formik.errors.email}</p> : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white">contraseña</label>
                    <input className="bg-white" type="password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password ? <p className="text-red-700">{formik.errors.password}</p> : null}
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={` w-full py-3 mt-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 shadow-md cursor-pointer
                                ${formik.isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"}
                                 `} >
                    {formik.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>


            </form>
        </div >
    )
}


export default LoginForm
