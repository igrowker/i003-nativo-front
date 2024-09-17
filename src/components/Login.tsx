import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login exitoso:", data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error durante el inicio de sesión",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-[1rem]">
      <div className="flex h-[232px] w-[294px] flex-col items-center justify-center bg-[#D9D9D9]">
        <h3 className="text-center text-[28px] font-bold text-[#000000]">
          NATIVO
        </h3>
        <p className="text-[10px] font-bold">Banco Rural</p>
      </div>

      {error && (
        <div className="rounded-md bg-red-500 p-2 text-white">{error}</div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-[296px] flex-col items-center justify-center gap-[20px]"
      >
        <div className="flex w-full flex-col gap-[12px]">
          <input
            type="email"
            placeholder="Email"
            className="form__input-placeholder h-[42px] w-full rounded-[20px] bg-[#D9D9D9]"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Contraseña"
            className="form__input-placeholder h-[42px] w-full rounded-[20px] bg-[#D9D9D9]"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <a
            href="/forgot-password"
            className="ml-auto h-auto w-auto text-[15px] font-bold text-[#545353] underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          type="submit"
          className="h-[42px] w-full rounded-[20px] bg-[#D9D9D9] text-[20px] font-bold text-[#000000]"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
      <p className="text-center text-[16px] font-bold">O ingresar con</p>
      <ul className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <li
            key={i}
            className="h-[25px] w-[25px] rounded-full bg-[#D9D9D9]"
          ></li>
        ))}
      </ul>
      <p className="flex h-auto w-auto flex-col text-center text-[15px] font-bold text-[#545353]">
        Aún no tienes una cuenta?
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
