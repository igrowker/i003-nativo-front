import { ContainerGreen } from "../components/about/ContainerGreen";

const AboutUs: React.FC = () => {
  return (
    <main className="mx-auto flex w-full flex-col items-center gap-4 font-lato md:w-[442px]">
      <section className="mb-4 flex w-full flex-col items-center bg-light-green py-6">
        <h1 className="text-center text-xl font-bold">Nosotros</h1>
        <img src="./logonativo.png" alt="Logo" />
        <h2 className="w-3/5 text-center text-xl font-bold">
          Más que un banco, un aliado para la comunidad rural
        </h2>
      </section>
      <section className="mx-4 mb-4 rounded-[20px] bg-light-green px-4 py-5 drop-shadow-box sm:mx-10">
        <h3 className="pb-6 text-xl font-bold [text-shadow:_2px_2px_2px_rgb(0_0_0_/_15%)]">
          Nuestros valores
        </h3>
        <ContainerGreen>
          <p className="font-medium leading-[19px] md:pr-5">
            En Nativo Banco Rural, queremos reflejar nuestra misión de
            transformar la banca en áreas rurales y su compromiso con la
            comunidad, lo que implica:
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-3 pt-5 font-bold">
            <li>Inclusión Financiera</li>
            <li>Compromiso con la Comunidad</li>
            <li>Innovación Adaptada</li>
            <li>Solidaridad y Apoyo Mutuo</li>
            <li>Transparencia y Confianza</li>
            <li>Sostenibilidad Local</li>
          </ul>
        </ContainerGreen>
        <img
          src="./nativo-icon.png"
          alt="Logo Nativo"
          className="mx-auto h-fit w-28 py-2"
        />
        <h3 className="pb-6 text-xl font-bold">Nuestros objetivos</h3>
        <ContainerGreen>
          <p className="pb-5 font-medium leading-[19px] md:pr-5">
            <span className="font-bold">Impulsar</span> la confianza de la
            sociedad en las economías rurales y, en general, en el crédito
            cooperativo y divulgar la filosofía y los principios que configuran
            una cultura colaborativa específica e inclusiva.
          </p>
          <p className="pb-5 font-medium leading-[19px] md:pr-5">
            <span className="font-bold">Promocionar</span> las actividades de
            las comunidades rurales asociadas y coordinar su representación ante
            otras entidades económicas y ante otras instituciones.
          </p>
          <p className="font-medium leading-[19px] md:pr-5">
            <span className="font-bold">Fomentar</span> el desarrollo de los
            principios de solidaridad y apoyo recíproco entre las comunidades
            rurales asociadas.
          </p>
        </ContainerGreen>
        <img
          src="./nativo-icon.png"
          alt="Logo Nativo"
          className="mx-auto h-fit w-28 py-2"
        />
        <h3 className="pb-6 text-xl font-bold">Nuestro trabajo</h3>
        <ContainerGreen>
          <p className="pb-5 font-medium leading-[19px] md:pr-5">
            <span className="font-bold">Integración Local e Incentivos:</span>{" "}
            Colaboración con comercios locales para promover un sistema de pago
            digital, incentivando su uso.
          </p>
          <p className="pb-5 font-medium leading-[19px] md:pr-5">
            <span className="font-bold">Fomento de la Colaboración: </span>{" "}
            Facilita iniciativas de ayuda mutua y microcréditos entre los
            usuarios.
          </p>
          <p className="font-medium leading-[19px] md:pr-5">
            <span className="font-bold">
              Reducción de la Dependencia del Billete:
            </span>{" "}
            Implementación de pagos QR y servicios digitales para disminuir el
            uso de efectivo, creando un ecosistema financiero más inclusivo y
            seguro.
          </p>
        </ContainerGreen>
      </section>
      <section className="flex w-full flex-col items-center bg-light-green px-10 py-6">
        <h4 className="pe-6 text-xl font-bold leading-[26px]">
          Con estas medidas, Nativo no solo va a proporcionar una solución de
          pago eficiente sino que también va a facilitar la transición hacia un
          sistema financiero menos dependiente del efectivo, fomentando una
          mayor inclusión financiera y mejorando la eficiencia económica en las
          comunidades rurales.
        </h4>
      </section>
      <img
        src="./nativo-icon.png"
        alt="Logo Nativo"
        className="mx-auto mb-1 mt-[-10px] h-fit w-28"
      />
    </main>
  );
};

export default AboutUs;
