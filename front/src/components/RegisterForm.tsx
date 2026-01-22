"use client";
import { useFormik } from "formik";
import { initialValuesRegister, RegisterFormValuesInterface, RegisterSchema } from "@/validators/RegisterSchema";
import { registerUserService } from "@/services/aut.services";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
    const router = useRouter()
    const formik = useFormik<RegisterFormValuesInterface>({
        initialValues: initialValuesRegister,
        validationSchema: RegisterSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await registerUserService(values);
                console.log("formulario enviado", response)
                router.push("/login");
                resetForm();

            } catch (error) {
                console.error(error);
            }
        }

    })

    return (
        <div className="bg-blue-400 flex justify-center items-center h-full">
            <form onSubmit={formik.handleSubmit} className="text-black">
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white">Email</label>
                    <input className="bg-white" type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email ? <p className="text-red-700">{formik.errors.email}</p> : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white">contraseña</label>
                    <input className="bg-white" type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password ? <p className="text-red-700">{formik.errors.password}</p> : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white">Confirmacion de contraseña</label>
                    <input className="bg-white" type="password" id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                    {formik.errors.confirmPassword ? <p className="text-red-700">{formik.errors.confirmPassword}</p> : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white">Nombre</label>
                    <input className="bg-white" type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name ? <p className="text-red-700">{formik.errors.name}</p> : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white">Direccion</label>
                    <input className="bg-white" type="text" id="address" name="address" value={formik.values.address} onChange={formik.handleChange} />
                    {formik.errors.address ? <p className="text-red-700">{formik.errors.address}</p> : null}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-white">Telefono</label>
                    <input className="bg-white" type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                    {formik.errors.phone ? <p className="text-red-700">{formik.errors.phone}</p> : null}
                </div>
                <button type="submit"
                    disabled={formik.isSubmitting}
                    className={` w-full py-1 mt-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 shadow-md cursor-pointer
                                ${formik.isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"}
                                 `}>
                    {formik.isSubmitting ? "Regristando... " : "Registrate"}
                </button>
            </form>
        </div>
    )
}


export default RegisterForm
