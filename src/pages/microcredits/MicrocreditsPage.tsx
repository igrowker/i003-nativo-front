import useSmoothNavigate from "../../hooks/useSmoothNavigate";

const MicrocreditsPage: React.FC = () => {
  const smoothNavigate = useSmoothNavigate();

  return (
    <section className="flex flex-col items-center bg-[#F6FAFD] pb-8 font-lato">
      <article className="flex w-full flex-col items-center justify-center gap-4 bg-[#E1F0D7] py-10">
        <img src="./microcredits/money.png" alt="Imagen de dinero" />
        <h1 className="w-2/3 text-center text-base font-medium">
          Banca colaborativa para fortalecer tu comunidad.
        </h1>
      </article>
      <div className="mt-14 flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => smoothNavigate("/apply-microcredit")}
          className="w-[266px] rounded-full bg-[#8EC63F] py-[12px] text-base font-bold"
        >
          Gestionar un microcrédito
        </button>
        <button
          onClick={() => smoothNavigate("/contribute-microcredit")}
          className="w-[266px] rounded-full bg-[#FFC905] py-[12px] text-base font-bold"
        >
          Contribuir
        </button>
        <button
          onClick={() => smoothNavigate("/donations")}
          className="w-[266px] rounded-full bg-[#FFC905] py-[12px] text-base font-bold"
        >
          Donar
        </button>
      </div>
      <article className="mt-8 w-[274px] rounded-3xl border-2 border-[#C9FFB4] bg-white px-6 py-10 shadow-md">
        <p>
          Sabemos que las actividades económicas en pequeñas comunidades, pueden
          sufrir inclemencias.
          <br />
          Desde Nativo, buscamos fomentar la colaboración, cooperación y ayuda
          mutua entre los miembros de la comunidad
        </p>
      </article>
      <article className="mt-8 w-[274px] rounded-3xl border-2 border-[#C9FFB4] bg-white px-6 py-10 shadow-md">
        <p>
          Por ello, si perdiste tu cosecha o sufriste una catástrofe en tu
          negocio, puedes pedir ayuda a los socios del banco para solventar la
          recuperación de tu pérdida.
          <br />
          De la misma manera, puedes elegir colaborar con tu vecino para que,
          entre todos, saquemos a la comunidad adelante.
        </p>
      </article>
      <img
        src="./microcredits/saving_money.png"
        alt="Imagen cerdo para ahorrar dinero"
        className="mt-6"
      />
      <div className="mt-8">
        <h2 className="text-center text-[18px] font-bold">
          Si necesitas ayuda
        </h2>
        <article className="mt-7 w-[274px] rounded-3xl border-2 border-[#C9FFB4] bg-[#E1F0D7] px-6 py-10 shadow-md">
          <p className="bullet-text">
            Puedes solicitar la colaboración de los otros usuarios de Nativo
            Banco Rural. Enviaremos una notificación a cada socio, que podrá
            hacer una colaboración voluntaria para ayudarte.
          </p>
          <p className="bullet-text mt-5">
            También puedes solicitar un préstamo con una tasa de interés
            solidaria a la comunidad para solucionar tus problemas
          </p>
        </article>
      </div>
      <div className="mt-8">
        <h2 className="text-center text-[18px] font-bold">Si deseas ayudar</h2>
        <article className="mt-7 w-[274px] rounded-3xl border-2 border-[#C9FFB4] bg-[#E1F0D7] px-6 py-10 shadow-md">
          <p>
            Banco nativo te ofrece la posibilidad de colaborar con la comunidad:
          </p>
          <p className="bullet-text mt-5">
            Realizando una donación a una caja común cuyos fondos serán
            adjudicados a quien lo necesite.
          </p>
          <p className="bullet-text mt-5">
            Respondiendo a las solicitudes de ayuda de tu comunidad por medio de
            las notificaciones.
          </p>
          <p className="bullet-text mt-5">
            Prestando tu dinero a una tasa solidaria para colaborar con algún
            usuario que lo necesite
          </p>
        </article>
      </div>
    </section>
  );
};

export default MicrocreditsPage;
