import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "../../store/useUserStore";
import { requestMicrocreditService } from "../../services/reqMicrocreditService";
import SuccessMessage from "../modal/SuccessMessage";
import ErrorMessage from "../modal/ErrorMessage";
import { useState } from "react";
import z from "zod";
import useSmoothNavigate from "../../hooks/useSmoothNavigate";

const microcreditSchema = z.object({
  titleRequest: z
    .string()
    .trim()
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
  description: z.string().trim().optional(),
});

type MicrocreditsInputs = z.infer<typeof microcreditSchema>;

const ApplyMicrocreditForm: React.FC = () => {
  const smoothNavigate = useSmoothNavigate();
  const [isRequestSuccessful, setIsRequestSuccessful] = useState<
    boolean | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const closeModal = () => {
    setIsRequestSuccessful(null);
  };

  const onSubmit: SubmitHandler<MicrocreditsInputs> = async (data) => {
    if (!token) {
      return;
    }
    try {
      const result = await requestMicrocreditService(
        token,
        data.amountToRequest,
        data.titleRequest,
        data.description || "",
      );
      console.log("Microcrédito solicitado con éxito:", result);
      setIsRequestSuccessful(true);
    } catch (error) {
      console.error("Error al solicitar el microcrédito:", error);
      const errorMsg =
        error instanceof Error
          ? error.message.toString()
          : "Error al solicitar el microcrédito";
      setErrorMessage(errorMsg);
      setIsRequestSuccessful(false);
    }
  };

  return (
    <div className="relative mt-9 flex w-full flex-col items-center justify-center gap-4 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col gap-2 p-4"
      >
        <div className="max-w-auto flex h-auto w-full flex-col gap-8 rounded-3xl border-2 border-[#C9FFB4] bg-white p-4 shadow-md">
          <h2 className="text-left text-base font-semibold">Solicitar</h2>
          <div className="flex w-full flex-col gap-8">
            <fieldset>
              <label>Motivo principal</label>
              <input
                type="text"
                maxLength={50}
                placeholder="Escriba el motivo"
                className="mt-2 h-10 w-full rounded-lg border border-[#C7C7C7] bg-transparent pl-4 placeholder-[#C7C7C7] shadow-md"
                {...register("titleRequest", { valueAsNumber: false })}
              />
              {errors.titleRequest && (
                <span className="-mt-2 text-red-700">
                  {errors.titleRequest.message}
                </span>
              )}
            </fieldset>
            <fieldset>
              <label>Monto a solicitar</label>
              <input
                type="number"
                min={1}
                max={500000}
                placeholder="Monto a solicitar"
                className="mt-2 h-10 w-full rounded-lg border border-[#C7C7C7] bg-transparent pl-4 placeholder-[#C7C7C7] shadow-md"
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
                className="mt-2 h-[134px] w-full rounded-lg border border-[#C7C7C7] bg-transparent p-4 placeholder-[#C7C7C7] shadow-md placeholder:p-0 placeholder:pt-0"
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
              className="border-1 h-5 w-5 appearance-none border-[#8C8C8C] font-bold checked:border-transparent checked:bg-[#5f9f00] checked:after:block checked:after:text-center checked:after:leading-[17px] checked:after:text-white checked:after:content-['✓'] focus:outline-none"
            />
            <label htmlFor="privacy" className="ml-2 text-sm text-[#8C8C8C]">
              He leído y acepto la{" "}
              <a href="#" className="text-blue-600 hover:underline">
                política de privacidad
              </a>
            </label>
          </div>
          {errors.privacyPolicy && (
            <span className="block text-red-700">
              {errors.privacyPolicy.message}
            </span>
          )}

          <fieldset className="mt-4 flex items-start">
            <input
              type="checkbox"
              {...register("termsConditions")}
              className="border-1 h-5 w-5 appearance-none border-[#8C8C8C] font-bold checked:border-transparent checked:bg-[#5f9f00] checked:after:block checked:after:text-center checked:after:leading-[17px] checked:after:text-white checked:after:content-['✓'] focus:outline-none"
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
      {isRequestSuccessful && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-green bg-opacity-50">
          <SuccessMessage
            title="¡Felicitaciones! Tu solicitud de crédito ha sido aprobada!"
            message="Pronto podrás verlo reflejado en tu saldo."
            closeModal={() => smoothNavigate("/history-microcredits")}
          />
        </div>
      )}
      {isRequestSuccessful === false && errorMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-green bg-opacity-50">
          <ErrorMessage
            title={errorMessage}
            message="Contactá a un asesor financiero para resolver tus dudas."
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default ApplyMicrocreditForm;
