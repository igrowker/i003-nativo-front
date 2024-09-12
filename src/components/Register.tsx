import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(5, "La contraseña debe tener al menos 8 caracteres"),
    repeatPassword: z
      .string()
      .min(5, "La contraseña debe tener al menos 8 caracteres"),
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
      lastname: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-[1rem]">
      <div className="flex h-[164px] w-[208px] flex-col items-center justify-center bg-[#D9D9D9]">
        <h3 className="text-center text-[28px] font-bold text-[#000000]">
          NATIVO
        </h3>
        <p className="text-[10px] font-bold">Banco Rural</p>
      </div>
      <h1 className="text-[28px] font-bold text-[#000000]">Registrate</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-[296px] flex-col items-center justify-center gap-[20px]"
      >
        <div className="flex w-full flex-col gap-[12px]">
          <input
            type="text"
            placeholder="Nombre"
            className="form__input-placeholder h-[42px] w-full bg-[#D9D9D9]"
            {...register("name")}
          />
          {errors.name && <span>{errors.name?.message}</span>}

          <input
            type="text"
            placeholder="Apellido"
            className="form__input-placeholder h-[42px] w-full bg-[#D9D9D9]"
            {...register("lastname")}
          />
          {errors.lastname && <span>{errors.lastname?.message}</span>}

          <input
            type="text"
            placeholder="Teléfono"
            className="form__input-placeholder h-[42px] w-full bg-[#D9D9D9]"
            {...register("phone")}
          />
          {errors.phone && <span>{errors.phone.message}</span>}

          <input
            type="email"
            placeholder="Correo Electrónico"
            className="form__input-placeholder h-[42px] w-full bg-[#D9D9D9]"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Contraseña"
            className="form__input-placeholder h-[42px] w-full bg-[#D9D9D9]"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <input
            type="password"
            placeholder="Repetir Contraseña"
            className="form__input-placeholder h-[42px] w-full bg-[#D9D9D9]"
            {...register("repeatPassword")}
          />

          {errors.repeatPassword && (
            <span>{errors.repeatPassword.message}</span>
          )}
        </div>
        <p className="h-auto w-[216px] text-center text-[16px] font-bold">
          A continuación, sacaremos unas fotos de tu DNI y una de tu rostro.
          Asegúrate de tener buena luz y un fondo claro para ambas
        </p>
        <button
          type="submit"
          className="h-[42px] w-full bg-[#D9D9D9] text-[20px] font-bold text-[#000000]"
        >
          SIGUIENTE
        </button>
      </form>
    </div>
  );
};

export default Register;
