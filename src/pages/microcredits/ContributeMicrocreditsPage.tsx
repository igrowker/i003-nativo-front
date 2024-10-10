import CreditsApliedContribute from "../../components/microcredits/CreditsApliedContribute";

const ContributeMicrocreditsPage: React.FC = () => {
  return (
    <div className="bg-[#E1F0D7] pb-8 font-lato">
      <article className="flex w-full flex-col items-center justify-center gap-4 bg-[#E1F0D7] pt-10 pb-8">
        <h1 className="text-center text-xl font-bold">Contribución</h1>
        <img
          src="./microcredits/contribute.png"
          alt="Imagen solicitando microcrédito"
          className="h-[180px]"
        />
        <h2 className="text-center text-xl font-bold">Colaborá en un microcrédito</h2>
      </article>
      <CreditsApliedContribute />
    </div>
  );
};

export default ContributeMicrocreditsPage;
