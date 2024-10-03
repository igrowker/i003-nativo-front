import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const microcreditSchema = z.object({
  amountToRequest: z
    .number()
    .min(1, "La cantidad solicitada debe ser mayor a 0")
    .max(500000, "Excede la cantidad máxima a solicitar, son 500,000"),
  installmentsNumber: z
    .number()
    .refine((val) => [10, 12, 24, 36, 48, 60].includes(val), {
      message: "Seleccione una cantidad válida de cuotas",
    }),
  installmentsFrecuency: z.enum(["semanal", "quincenal", "mensual"], {
    errorMap: () => ({ message: "Seleccione la frecuencia de pago" }),
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar la política de privacidad",
  }),
  termsConditions: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar los términos y condiciones",
  }),
  description: z.string().optional(),
});

type MicrocreditsInputs = z.infer<typeof microcreditSchema>;

const ApplyMicrocreditForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MicrocreditsInputs>({
    resolver: zodResolver(microcreditSchema),
    defaultValues: {
      amountToRequest: 1,
      installmentsNumber: 0,
    },
  });

  const onSubmit: SubmitHandler<MicrocreditsInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="mt-9 flex w-full flex-col items-center justify-center gap-5 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col gap-8 p-4"
      >
        <div className="max-w-auto flex h-auto w-full flex-col gap-8 rounded-3xl border-2 border-[#C9FFB4] bg-white p-4 shadow-md">
          <h2 className="text-left text-base font-semibold">Solicitar</h2>
          <div className="flex w-full flex-col gap-8">
            <input
              type="number"
              placeholder="Monto a solicitar"
              className="h-10 w-full rounded-lg border border-[#C7C7C7] bg-transparent pl-4 placeholder-[#C7C7C7] shadow-md"
              {...register("amountToRequest", { valueAsNumber: true })}
            />
            {errors.amountToRequest && (
              <span className="mt-0 text-red-700">
                {errors.amountToRequest.message}
              </span>
            )}

            <div className="relative w-full">
              <select
                {...register("installmentsNumber", { valueAsNumber: true })}
                className="h-10 w-full appearance-none rounded-lg border border-[#C7C7C7] bg-transparent px-4 py-2 pr-10 leading-tight text-[#C7C7C7] shadow-md focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={0} disabled>
                  Cantidad de cuotas
                </option>
                <option value={10}>10</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
                <option value={48}>48</option>
                <option value={60}>60</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-[#C7C7C7]">
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            {errors.installmentsNumber && (
              <span className="-mt-4 block text-red-700">
                {errors.installmentsNumber.message}
              </span>
            )}

            <div className="relative w-full">
              <select
                {...register("installmentsFrecuency")}
                className="h-10 w-full appearance-none rounded-lg border border-[#C7C7C7] bg-transparent px-4 py-2 pr-10 leading-tight text-[#C7C7C7] shadow-md focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue={""}
              >
                <option value="" disabled>
                  Frecuencia de pagos
                </option>
                <option value="semanal">Semanal</option>
                <option value="quincenal">Quincenal</option>
                <option value="mensual">Mensual</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-[#C7C7C7]">
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            {errors.installmentsFrecuency && (
              <span className="-mt-4 text-red-700">
                {errors.installmentsFrecuency.message}
              </span>
            )}
            <textarea
              placeholder="Motivo o justificación"
              className="h-[134px] w-full rounded-lg border border-[#C7C7C7] bg-transparent p-4 placeholder-[#C7C7C7] shadow-md placeholder:p-0 placeholder:pt-0"
              {...register("description")}
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              {...register("privacyPolicy")}
              className="h-5 w-5 appearance-none border border-[#71717A] bg-transparent font-bold checked:border-transparent checked:bg-[#5f9f00] checked:after:block checked:after:text-center checked:after:leading-[17px] checked:after:text-white checked:after:content-['✓'] focus:outline-none"
            />
            <label htmlFor="privacy" className="ml-2 text-sm text-[#8C8C8C]">
              He leído y acepto la{" "}
              <a href="#" className="text-blue-600 hover:underline">
                política de privacidad
              </a>
            </label>
          </div>
          {errors.privacyPolicy && (
            <span className="mt-2 block text-red-700">
              {errors.privacyPolicy.message}
            </span>
          )}

          <div className="mt-4 flex items-start">
            <input
              type="checkbox"
              {...register("termsConditions")}
              className="h-5 w-5 appearance-none border border-[#71717A] bg-transparent font-bold checked:border-transparent checked:bg-[#5f9f00] checked:after:block checked:after:text-center checked:after:leading-[17px] checked:after:text-white checked:after:content-['✓'] focus:outline-none"
            />
            <label htmlFor="conditions" className="ml-2 text-sm text-[#8C8C8C]">
              Acepto{" "}
              <a href="#" className="text-blue-600 hover:underline">
                términos y condiciones.
              </a>
            </label>
          </div>
          {errors.termsConditions && (
            <span className="mt-2 block text-red-700">
              {errors.termsConditions.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="mt-6 h-[42px] w-full rounded-full bg-[#8EC63F] text-[20px] font-semibold text-black"
        >
          Solicitar
        </button>
      </form>
    </div>
  );
};

export default ApplyMicrocreditForm;
