import * as Yup from 'yup';

// Definimos la interfaz de los valores del formulario, en este caso es REGISTER
export interface RegisterFormValuesInterface {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    address: string;
    phone: string;
}


// definimos los valores iniciales de mi formulario de Register
export const initialValuesRegister: RegisterFormValuesInterface = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    address: '',
    phone: '',
};

// esquema de validaciones para este formulariuo con YUP
export const RegisterSchema = Yup.object({
    email: Yup.string().email('Email no valido').required('El email es obligatorio'),
    password: Yup.string().min(6, 'la contrasena debe tener por lo menos 6 caracteres').required('la contrasena es obligatoria'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contrasenas no coinciden').required('la confirmacion de contrasena es obligatoria'),
    name: Yup.string().required('El nombre es obligatorio'),
    address: Yup.string().required('La direccion es obligatoria'),
    phone: Yup.string().matches(
        /^[0-9+\-\s()]+$/, 'El telefono debe contener solo numeros y caracteres validos ')
        .required('El telefono es obligatorio'),
}) 