import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import {
  IoIosInformationCircleOutline,
  IoMdHelpCircleOutline,
} from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {
  MdFavoriteBorder,
  MdOutlinePayment,
  MdOutlineSyncAlt,
} from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { Link } from "react-router-dom";
import useDevice from "../hooks/useDevice";
import useUserStore from "../store/useUserStore";

interface Link {
  icon?: JSX.Element;
  name: string;
  path?: string;
  subpages?: Link[];
}

const linksLogged: Link[] = [
  {
    icon: <GoHome size={22} className="ml-2" />,
    name: "Inicio",
    path: "/dashboard",
  },
  {
    icon: <FaRegUser size={22} className="ml-2" />,
    name: "Mi perfil",
    path: "/profile",
  },
  {
    icon: <MdOutlineSyncAlt size={22} className="ml-2" />,
    name: "Mis movimientos",
    path: "/history",
  },
  {
    icon: <MdOutlinePayment size={22} className="ml-2" />,
    name: "Mis microcréditos",
    path: "/history-microcredits",
  },
  {
    icon: <MdFavoriteBorder size={22} className="ml-2" />,
    name: "Mis donaciones",
    path: "/donations",
  },
  {
    icon: <IoMdHelpCircleOutline size={22} className="ml-2" />,
    name: "Ayuda microcréditos",
    path: "/microcredits",
  },
];

const linksNotLogged: Link[] = [
  {
    icon: <FiLogIn size={22} className="ml-2" />,
    name: "Iniciar sesión",
    path: "/login",
  },
  {
    icon: <IoIosInformationCircleOutline size={22} className="ml-2" />,
    name: "Sobre nosotros",
    path: "/about",
  },
  {
    icon: <TbUsersGroup size={22} className="ml-2" />,
    name: "Nuestro equipo",
    path: "/team",
  },
  {
    icon: <IoMdHelpCircleOutline size={22} className="ml-2" />,
    name: "Ayuda",
    path: "/help",
  },
];

const MobileNav: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const token = useUserStore((state) => state.token);
  const userActive = token !== null;

  return (
    <nav className="relative z-20 flex h-[50px] w-full items-center justify-between bg-[#8EC63F] px-4">
      <GiHamburgerMenu size={28} onClick={onToggle} />

      <Link
        to={`${userActive ? "/dashboard" : "/"}`}
        className="flex flex-grow justify-center"
      >
        <img src="./logonav.png" alt="logo" className="h-auto w-auto" />
      </Link>
    </nav>
  );
};

const Sidebar: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const token = useUserStore((state) => state.token);
  const clearUser = useUserStore((state) => state.clearUser);
  const userActive = token !== null;

  const handleLogout = () => {
    clearUser();
    onClose();
    window.location.reload();
  };

  React.useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup cuando el componente se desmonta o el estado `open` cambia
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);
  return (
    <>
      {open && (
        <div
          className={`fixed inset-0 z-10 bg-[#c7f8a7] ${!userActive ? "bg-opacity-5" : "bg-opacity-30"} backdrop-blur-sm`}
        />
      )}

      {userActive && (
        <aside
          className={`fixed left-0 top-[50px] z-20 h-[calc(100%-50px)] w-[259px] transform rounded-br-3xl rounded-tr-3xl transition-transform duration-500 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative flex h-[100vh] w-[100%] flex-col items-center justify-start rounded-br-3xl rounded-tr-3xl bg-[#F6FAFD]">
            <IoClose
              className="absolute left-0 top-0 ml-3 mt-4"
              size={30}
              onClick={onClose}
            />
            <img
              src="./logonativo.png"
              alt="logo"
              width={150}
              height={150}
              className="mt-8"
            />

            <div className="b flex h-[70%] w-full flex-col items-center justify-start gap-2 pt-5">
              {linksLogged.map((link, index) => (
                <Link
                  to={link.path!}
                  key={index}
                  onClick={onClose}
                  className="aside__link--shadow flex h-[36px] w-[247px] items-center justify-start gap-2 rounded-[20px] bg-[#8ec63f] pl-4 text-center"
                >
                  {link.icon}
                  <p className="size-[14px] h-auto w-auto text-center font-[700px] leading-[16.8px] text-black">
                    {link.name}
                  </p>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="aside__link--shadow flex h-[36px] w-[247px] items-center justify-start gap-2 rounded-[20px] bg-[#F6FAFD] pl-4 text-center"
              >
                <FaRegUser size={22} className="ml-2" />
                <p className="size-[14px] h-auto w-auto text-center font-[700px] leading-[16.8px] text-black">
                  Cerrar sesión
                </p>
              </button>
            </div>
          </div>
        </aside>
      )}

      {!userActive && (
        <aside
          className={`fixed left-0 top-[50px] z-20 h-[calc(100%-50px)] w-[259px] transform rounded-br-3xl rounded-tr-3xl transition-transform duration-500 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative flex h-[100vh] w-[100%] flex-col items-center justify-start rounded-br-3xl rounded-tr-3xl bg-[#E1F0D7]">
            <IoClose
              className="absolute left-0 top-0 ml-3 mt-4"
              size={30}
              onClick={onClose}
            />
            <img
              src="./logonativo.png"
              alt="logo"
              width={150}
              height={150}
              className="mt-8"
            />

            <div className="b flex h-[70%] w-full flex-col items-center justify-start gap-2 pt-5">
              {linksNotLogged.map((link, index) => (
                <Link
                  to={link.path!}
                  key={index}
                  onClick={onClose}
                  className="aside__link--shadow flex h-[36px] w-[247px] items-center justify-start gap-2 rounded-[20px] bg-[#F6FAFD] pl-4 text-center"
                >
                  {link.icon}
                  <p className="size-[14px] h-auto w-auto text-center font-[700px] leading-[16.8px] text-black">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const device = useDevice();

  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      {device === "Mobile" && <MobileNav onToggle={toggleSidebar} />}
      <Sidebar open={open} onClose={toggleSidebar} />
    </>
  );
};
