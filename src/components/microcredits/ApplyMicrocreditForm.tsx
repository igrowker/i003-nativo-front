import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "../../store/useUserStore";

import z from "zod";
import { requestMicrocreditService } from "../../services/reqMicrocreditService";

const microcreditSchema = z.object({
  titleRequest: 
      z.string()
     .min(1, { message: "El motivo de la solicitud es obligatorio" }),
  amountToRequest: z
    .number()
    .min(1, "La cantidad solicitada debe ser mayor a 0")
    .max(500000, "Excede la cantidad máxima a solicitar, son 500,000"),
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

  const token = useUserStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MicrocreditsInputs>({
    resolver: zodResolver(microcreditSchema),
    defaultValues: {
      amountToRequest: 1000,
    },
  });

  const onSubmit: SubmitHandler<MicrocreditsInputs> = async (data) => {
    console.log(token)
    if (!token) {
      console.error("Token o ID de usuario no disponibles");
      return;
    }

    try {
      const result = await requestMicrocreditService(
        token,
        data.amountToRequest,
        data.titleRequest,
        data.description || ""
      );
      console.log("Microcrédito solicitado con éxito:", result);
    } catch (error) {
      console.error("Error al solicitar el microcrédito:", error);
    }
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
            <fieldset>
              <label>Motivo principal</label>
              <input
                type="text"
                maxLength={50}
                placeholder="Ingrese la razón de su solicitud"
                className="h-10 w-full rounded-lg border border-[#C7C7C7] bg-transparent pl-4 placeholder-[#C7C7C7] shadow-md mt-2"
                {...register("titleRequest", { valueAsNumber: false })}
              />
              {errors.titleRequest && (
                <span className="-mt-2 text-red-700">
                  {errors.titleRequest.message}
                </span>
              )}
            </fieldset>
            <fieldset>
              <label> Monto a solicitar</label>
              <input
                type="number"
                min={1}
                max={500000}
                placeholder="Monto a solicitar"
                className="h-10 w-full rounded-lg border border-[#C7C7C7] bg-transparent pl-4 placeholder-[#C7C7C7] shadow-md mt-2"
                {...register("amountToRequest", { valueAsNumber: true })}
              />
              {errors.amountToRequest && (
                <span className="-mt-2 text-red-700">
                  {errors.amountToRequest.message}
                </span>
              )}
            </fieldset>
            <fieldset>
              <label>Descripción</label>
              <textarea
                maxLength={256}
                placeholder="Describa los detalles de su solicitud"
                className="h-[134px] w-full rounded-lg border border-[#C7C7C7] bg-transparent p-4 placeholder-[#C7C7C7] shadow-md placeholder:p-0 placeholder:pt-0 mt-2"
                {...register("description")}
              />
            </fieldset>
          </div>
        </div>
        <fieldset className="mt-6">
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

          <fieldset className="mt-4 flex items-start">
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
          </fieldset>
          {errors.termsConditions && (
            <span className="mt-2 block text-red-700">
              {errors.termsConditions.message}
            </span>
          )}
        </fieldset>
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
