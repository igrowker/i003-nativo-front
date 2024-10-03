const CreditsApliedContribute = () => {
  const applicationsHistory = [
    [
      {
        titulo: "Fecha de solicitud",
        data: "15/05/24",
      },
      {
        titulo: "Monto solicitado",
        data: "$120.350",
      },
      {
        titulo: "Tasa asignada",
        data: "15%",
      },
      {
        titulo: "Cantidad de cuotas solicitadas",
        data: "10",
      },
    ],
    [
      {
        titulo: "Fecha de solicitud",
        data: "15/05/24",
      },
      {
        titulo: "Monto solicitado",
        data: "$120.350",
      },
      {
        titulo: "Tasa asignada",
        data: "15%",
      },
      {
        titulo: "Cantidad de cuotas solicitadas",
        data: "10",
      },
    ],
    [
      {
        titulo: "Fecha de solicitud",
        data: "15/05/24",
      },
      {
        titulo: "Monto solicitado",
        data: "$120.350",
      },
      {
        titulo: "Tasa asignada",
        data: "15%",
      },
      {
        titulo: "Cantidad de cuotas solicitadas",
        data: "10",
      },
    ],
  ];

  return (
    <section className="mt-8 w-full px-4">
      <div className="max-w-auto mt-5 flex h-auto w-full flex-col gap-7 rounded-3xl border-2 border-[#C9FFB4] bg-white p-4 shadow-md">
        <h2 className="mb-0 mt-6 pl-4 text-left font-semibold">Solicitante</h2>
        <div className="relative -mt-6 ml-auto mr-0 w-1/2">
          <select
            name="cuotas"
            id="cuotas"
            className="h-10 w-full appearance-none rounded-lg border-none bg-transparent px-4 py-2 pr-10 text-sm leading-tight text-[#8C8C8C] focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled selected>
              Ordenar por
            </option>
            <option value="semanal">Más recientes</option>
            <option value="quincenal">Orden ascendente</option>
            <option value="mensual">Monto más alto</option>
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
        {applicationsHistory.map((credit, index) => {
          return (
            <article key={index} className="-mt-6">
              <div className="mt-4 rounded-xl border border-[#C9FFB4] p-4">
                <h3 className="mb-2 text-base font-semibold">
                  Usuario {index + 1}
                </h3>
                {credit.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-end justify-between text-xs"
                  >
                    <p className="w-auto">{value.titulo}</p>
                    <hr className="flex-1" />
                    <p>{value.data}</p>
                  </div>
                ))}
                <div className="mt-4 flex w-full justify-end">
                  <a href="./" className="text-blue-500 underline">
                    Ver más...
                  </a>
                </div>
                <button
                  type="submit"
                  className="mt-6 h-[42px] w-full rounded-full bg-[#8EC63F] text-[20px] font-semibold text-black"
                >
                  Contribuir
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CreditsApliedContribute;
