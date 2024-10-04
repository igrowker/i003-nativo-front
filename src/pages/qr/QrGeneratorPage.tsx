import QRGenerator from "../../components/qr/QRGenerator";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useUserStore from "../../store/useUserStore";

//funcion para que el amount este separado por comas
function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const generateQrSchema = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "El monto debe ser un número",
    })
    .transform((val) => Number(val)),
  receiverAccount: z.string(),
  description: z.string().optional(),
});

type GenerateQrInputs = z.infer<typeof generateQrSchema>;

const QrGeneratorPage = () => {
  const [enterAmountView, setEnterAmountView] = useState<boolean>(true);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<GenerateQrInputs | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GenerateQrInputs>({
    resolver: zodResolver(generateQrSchema),
    defaultValues: {
      amount: 0,
      receiverAccount: "",
      description: "",
    },
  });

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user?.accountId) {
      setValue("receiverAccount", user.accountId);
      setIsLoading(false);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<GenerateQrInputs> = (data) => {
    console.log(data);
    setDataForm(data);
    setDetailModal(false);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mt-[2rem] flex min-h-screen flex-col items-center justify-start gap-4">
      <h3 className="text-[20px] font-bold">Cobrá con QR</h3>
      {!enterAmountView && (
        <div
          className="flex h-[70px] w-[312px] items-center justify-between rounded-[10px] bg-[#E1F0D7] p-4"
          onClick={() => setEnterAmountView(true)}
        >
          <img src="./qr-logo.png" alt="qr-icon" />
          <p className="text-[16px] font-semibold">Generar QR</p>
        </div>
      )}
      {enterAmountView && (
        <>
          <div className="relative flex h-[528px] w-[312px] flex-col items-center justify-center rounded-[20px] bg-[#E1F0D7]">
            <p className="absolute top-6 text-[16px] font-semibold">
              Ingresá el monto a cobrar
            </p>
            <div className="mt-4 flex w-[80%] justify-center border-b-[1px] border-black">
              <p className="text-[36px] font-semibold">
                $ {numberWithCommas(dataForm?.amount || 0)}
              </p>
            </div>
            <button
              className="mt-6 flex items-center justify-center text-[12px]"
              onClick={() => setDetailModal(true)}
            >
              <img src="./pencil.png" alt="pen" /> Detalles
            </button>
          </div>
          <button className="h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-semibold text-[#000000]">
            Generar código QR
          </button>
        </>
      )}

      {detailModal && (
        <div className="fixed left-1/2 top-1/2 h-auto w-[232px] -translate-x-1/2 -translate-y-1/2 transform rounded-[20px] bg-white p-4">
          <div className="flex justify-between text-center">
            <h3 className="text-[14px] font-bold">Detalles</h3>
            <button onClick={() => setDetailModal(false)}>X</button>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Cuenta destino
              </label>
              <input
                type="text"
                {...register("receiverAccount")}
                defaultValue={dataForm?.receiverAccount}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {errors.receiverAccount && (
              <span className="text-red-500">
                {errors.receiverAccount.message}
              </span>
            )}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="amount"
                className="block text-[12px] font-medium text-gray-700"
              >
                Monto a cobrar
              </label>
              <input
                type="number"
                {...register("amount")}
                defaultValue={dataForm?.amount}
                placeholder="0.00"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {errors.amount && (
              <span className="text-red-500">{errors.amount.message}</span>
            )}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="description"
                className="block text-[12px] font-medium text-gray-700"
              >
                Motivo
              </label>
              <input
                type="text"
                {...register("description")}
                defaultValue={dataForm?.description}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Descripción del pago"
              />
            </div>
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
            <button
              type="submit"
              className="mt-10 h-auto w-full rounded-md bg-green-400"
            >
              listo
            </button>
          </form>
        </div>
      )}
      {dataForm && <QRGenerator dataForm={dataForm} />}
    </div>
  );
};

export default QrGeneratorPage;
