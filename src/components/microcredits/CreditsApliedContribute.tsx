import { useEffect } from "react";
import useUserStore from "../../store/useUserStore";
import useModal from "../../hooks/useModal";
import ContributeItem from "../Contributions/ContributeItem";

const CreditsApliedContribute: React.FC = () => {
  const microcreditListGral = useUserStore(
    (state) => state.microcreditsListGral,
  );
  const setMicrocreditListGral = useUserStore(
    (state) => state.setMicrocreditsListGral,
  );
  const { isModalOpen, modalContent, openModal, closeModal } = useModal();

  useEffect(() => {
    setMicrocreditListGral("pending");
  }, []);

  const handleRefresh = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCloseModal = () => {
    closeModal();
    handleRefresh();
  };

  return (
    <section className="mt-8 w-full px-4">
      <div className="max-w-auto mt-5 flex h-auto w-full flex-col gap-7 rounded-3xl border-2 border-[#C9FFB4] bg-white p-4 shadow-md">
        <h2 className="mb-0 mt-6 pl-4 text-left font-semibold">Solicitante</h2>
        <div className="relative -mt-6 ml-auto mr-0 w-2/3">
          <select
            name="credits"
            id="credits"
            className="h-10 w-full appearance-none rounded-lg border-none bg-transparent px-4 py-2 pr-10 text-sm leading-tight text-[#C7C7C7] focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
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
        {microcreditListGral.map((microcredit, index) => {
          return (
            <article key={microcredit.id} className="-mt-6">
              <div className="mt-4 rounded-xl border border-[#C9FFB4] p-4">
                <h3 className="mb-2 text-base font-semibold">
                  Usuario {index + 1}
                </h3>
                <ContributeItem
                  handleCloseModal={handleCloseModal}
                  microcredit={microcredit}
                  openModal={openModal}
                />
              </div>
            </article>
          );
        })}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-green bg-opacity-50">
          <div className="flex w-11/12 max-w-md flex-col gap-4 rounded-[40px] bg-primary-green p-6 shadow-lg">
            {modalContent}
          </div>
        </div>
      )}
    </section>
  );
};

export default CreditsApliedContribute;
