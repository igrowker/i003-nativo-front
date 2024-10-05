import CreditsApliedContribute from "../../components/microcredits/CreditsApliedContribute";

const ContributeMicrocreditsPage: React.FC = () => {
  return (
    <div className="bg-[#E1F0D7] pb-8">
      <article className="flex w-full flex-col items-center justify-center gap-4 bg-[#E1F0D7] py-10">
        <h1 className="w-2/3 text-center text-xl font-bold">Contribución</h1>
        <img
          src="./microcredits/contribute.png"
          alt="Imagen solicitando microcrédito"
        />
        <h2 className="w-2/3 text-center text-base font-extrabold">
          Colaborá
        </h2>
      </article>
      <CreditsApliedContribute />
    </div>
  );
};

export default ContributeMicrocreditsPage;
