import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import { ContainerWhite } from "../components/dashboard/ContainerWhite";
import MoneyJar from "../assets/Images/dashboard/money-jar.png";
import ButtonsBox from "../components/dashboard/ButtonsBox";
import accountService from "../services/accountService";
import useUserStore from "../store/useUserStore";
import { User } from "../interfaces/User";
import { Account } from "../interfaces/Account";

const Dashboard: React.FC = () => {
  const [showMoney, setShowMoney] = useState(true);
  const [account, setAccount] = useState<Account | null>(null);
  const user: User | null = useUserStore((store) => store.user);
  const accountId: string | null = user?.accountId ?? null;

  const switchShowMoney = () => {
    if (showMoney) {
      setShowMoney(false);
    } else {
      setShowMoney(true);
    }
  };

  const fetchAccount = async () => {
    if (!accountId) return;
    
    try {
      const accountData = await accountService.getAccountInformation(accountId);
      setAccount(accountData)
      console.log()
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    if (accountId) {
      fetchAccount();
    }
  }, [accountId]);

  return (
    <main className="mx-auto flex max-w-[480px] flex-col gap-6 bg-light-green px-6 py-4 font-lato">
      <h1 className="text-[13px] font-bold leading-4">¡Hola, {user?.name || "Nombre"}!</h1>
      <ContainerWhite className="flex justify-evenly p-2">
        <div className="">
          <div className="mt-7 flex gap-2">
            <h2 className="text-sm font-medium leading-4">Dinero disponible</h2>
            <button onClick={switchShowMoney}>
              <MdOutlineRemoveRedEye className="text-2xl" />
            </button>
          </div>
          <h2 className="mr-6 text-center text-[26px]">
            {showMoney ? `$${account?.amount ?? '0.00'}` : "$***"}
          </h2>
        </div>
        <img src={MoneyJar} alt="dinero" />
      </ContainerWhite>
      <ContainerWhite className="p-6">
        <h3 className="mb-7 text-start text-sm font-medium leading-4">
          Mis tarjetas
        </h3>
        <div className="relative h-[88px]">
          <div className="absolute left-0 top-0 h-[88px] w-[140px] rounded-[10px] bg-[#0177FF]"></div>
          <div className="absolute left-[45px] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#252527] sm:left-[70px]"></div>
          <div className="absolute left-[90px] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#AB7C36] sm:left-[140px]"></div>
          <div className="absolute left-[140px] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#6D2B5D] sm:left-[210px]"></div>
        </div>
      </ContainerWhite>
      <ContainerWhite className="px-6 py-4 text-[15px] font-bold leading-[18px]">
        <h3>Últimos movimientos</h3>
        <ul className="flex flex-col gap-5 pl-2 pr-6 pt-6">
          <li className="flex justify-between">
            <div>
              <p>XX/XX</p>
              <p>Xxxxxxx</p>
            </div>
            <p>$X.XXX</p>
          </li>
          <li className="flex justify-between">
            <div>
              <p>XX/XX</p>
              <p>Xxxxxxx</p>
            </div>
            <p>$X.XXX</p>
          </li>
          <li className="flex justify-between">
            <div>
              <p>XX/XX</p>
              <p>Xxxxxxx</p>
            </div>
            <p>$X.XXX</p>
          </li>
          <li className="flex justify-between">
            <div>
              <p>XX/XX</p>
              <p>Xxxxxxx</p>
            </div>
            <p>$X.XXX</p>
          </li>
        </ul>
        {/* CAMBIAR A RUTA DE HISTORIAL COMPLETO */}
        <div className="mt-3 w-full text-end font-medium text-blue-400">
          <Link to={"/"} className="text-xs leading-3">
            Ver más <BiChevronDown className="inline text-2xl" />
          </Link>
        </div>
      </ContainerWhite>
      <ButtonsBox />
    </main>
  );
};

export default Dashboard;
