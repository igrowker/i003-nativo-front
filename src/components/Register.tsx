import React, { useState, useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logonativo from "/logonativo.png";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import z from "zod";

// Función para validar si el usuario es mayor de 18 años
const isAdult = (birthday: string): boolean => {
  const birthDate = new Date(birthday);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)) {
    return age >= 18;
  } else {
    return age - 1 >= 18;
  }
};

const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    surname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    phone: z.string().min(8, "El teléfono debe tener al menos 8 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula",
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula",
      )
      .regex(/\d/, "La contraseña debe contener al menos un número")
      .regex(
        /[\W_]/,
        "La contraseña debe contener al menos un carácter especial",
      ),
    repeatPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    birthday: z
      .string()
      .refine((date) => isAdult(date), "Debes tener al menos 18 años"),
    dni: z
      .string()
      .min(7, "El DNI debe tener al menos 7 caracteres")
      .refine(
        (value) => /^\d+$/.test(value),
        "El DNI debe contener solo números",
      ),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
  });

type RegisterInputs = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
      birthday: "",
      dni: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [messageButton, setMessageButton] = useState("Siguiente");

  const token = useUserStore((state) => state.token);
  const setUser = useUserStore((state) => state.setUser);
  const setVerificationCode = useUserStore(
    (state) => state.setVerificationCode,
  );

  const navigate = useNavigate();

  /**
   * @param data Datos del formulario
   */

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      setIsLoading(true);
      setMessageButton("Cargando...");
      const response = await fetch(
        "https://i003-nativo-back-production.up.railway.app/api/autenticacion/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            dni: parseInt(data.dni, 10),
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            birthday: data.birthday,
          }),
        },
      );

      if (response.status === 201) {
        const result = await response.json();
        setUser({
          id: result.id,
          email: result.email,
          name: result.name,
          surname: result.surname,
          dni: result.dni.toString(),
          phone: result.phone,
          birthday: result.birthday,
        });
        console.log(result);
        setVerificationCode(result.verificationCode);

        navigate("/verification");
      } else {
        console.error("Error en la creación del usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setIsLoading(false);
      setMessageButton("Enviar");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-[1rem]">
      <img
        src={logonativo}
        alt="logo"
        className="flex h-[197px] w-[197px] items-center justify-center"
      />
      <h1 className="text-[28px] font-bold text-[#000000]">Registrate</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-[312px] flex-col items-center justify-center gap-[20px]"
      >
        <div className="w-ful flex flex-col justify-center gap-[12px]">
          <input
            type="text"
            placeholder="Nombre"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name?.message}</span>
          )}

          <input
            type="text"
            placeholder="Apellido"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("surname")}
          />
          {errors.surname && (
            <span className="text-red-500">{errors.surname?.message}</span>
          )}
          <input
            type="email"
            placeholder="Email"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <input
            type="password"
            placeholder="Repetir Contraseña"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("repeatPassword")}
          />
          {errors.repeatPassword && (
            <span className="text-red-500">
              {errors.repeatPassword.message}
            </span>
          )}

          <input
            type="text"
            placeholder="DNI/Cédula"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("dni")}
          />
          {errors.dni && (
            <span className="text-red-500">{errors.dni.message}</span>
          )}

          <input
            type="date"
            placeholder="Fecha de Nacimiento"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("birthday")}
          />
          {errors.birthday && (
            <span className="text-red-500">{errors.birthday.message}</span>
          )}

          <input
            type="text"
            placeholder="Número de teléfono"
            className="form__input-placeholder h-[39.44px] w-[296px] rounded-[6px] border-[1px] border-[#D9D9D9] p-2"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-bold text-[#000000]"
          disabled={isLoading}
        >
          {messageButton}
        </button>
      </form>
    </div>
  );
};

export default Register;
