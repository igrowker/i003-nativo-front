import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logonativo from "/logonativo.png";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type LoginInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      // Solicitud POST a la API
      const response = await fetch(
        "http://localhost:8080/api/autenticacion/inicio-sesion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.status === 200) {
        const responseData = await response.json();
        console.log("Inicio de sesión exitoso:", responseData);
        // Token de acceso + redirección (futura implementación)
      } else if (response.status === 404) {
        setError("Usuario no encontrado.");
      } else if (response.status === 401) {
        setError("Contraseña incorrecta o cuenta no verificada.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } catch (err) {
      setError("Ocurrió un error durante el inicio de sesión.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-[1rem]">
      <img
        src={logonativo}
        alt="logo"
        className="flex items-center justify-center"
      />

      {error && (
        <div className="rounded-md bg-red-500 p-2 text-white">{error}</div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-auto flex-col items-center justify-center gap-[20px]"
      >
        <div className="flex w-full flex-col gap-[12px]">
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
          <a
            href="/forgot-password"
            className="ml-auto h-auto w-auto text-[14px] font-bold text-[#545353] underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          type="submit"
          className="h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-bold text-[#000000]"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
      <p className="flex h-auto w-auto flex-col text-center text-[14px] font-bold text-[#545353]">
        ¿Aún no tienes una cuenta?
        <span>
          <a href="/register" className="text-[#000000] underline">
            Regístrate
          </a>
        </span>
      </p>
    </div>
  );
};

export default Login;
