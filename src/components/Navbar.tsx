import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import useDevice from "../hooks/useDevice";

interface Link {
  name: string;
  path?: string;
  subpages?: Link[];
}

const links: Link[] = [
  { name: "Inicio", path: "/" },
  { name: "Tarjeta", path: "/card" },
  { name: "Transacciones", path: "/transactions" },
  { name: "Colaborá con la comunidad", path: "/colaborate" },
  { name: "Hablá con nosotros", path: "/contact" },
];

const MobileNav: React.FC<{ onToggle: () => void }> = ({ onToggle }) => (
  <nav className="flex h-[50px] w-[100%] items-center justify-between bg-[#8EC63F] pl-4 pr-4">
    <GiHamburgerMenu size={28} onClick={onToggle} />
    <img src="./logonav.png" alt="logo" className="h-auto w-auto" />
    <FaRegUser size={28} />
  </nav>
);

const Sidebar: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => (
  <>
    {open && (
      <div className="fixed inset-0 z-10 bg-black bg-opacity-5 backdrop-blur-sm" />
    )}
    <aside
      className={`fixed left-0 top-0 z-20 h-full w-[70%] transform rounded-br-3xl rounded-tr-3xl bg-[#8EC63F] transition-transform duration-500 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative flex h-[100vh] w-[100%] flex-col items-center justify-center rounded-br-3xl rounded-tr-3xl bg-[#769b43]">
        <IoClose
          className="absolute left-0 top-0 ml-3 mt-4"
          size={30}
          onClick={onClose}
        />
        <div className="flex h-[30%] w-full flex-col items-center justify-center gap-6">
          <div className="h-[73px] w-[73px] rounded-full bg-gray-500" />
          <p className="size-[16px] w-auto font-bold text-black">
            Nombre de usuario
          </p>
        </div>
        <hr className="w-full border-t-2 border-black" />
        <div className="flex h-[70%] w-full flex-col items-start justify-start gap-8">
          {links.map((link, index) => (
            <div
              key={index}
              className="flex w-auto items-center justify-start pl-10 pt-4 text-start"
            >
              <p className="size-[14px] w-auto font-bold text-black">
                {link.name}
              </p>
              {link.subpages && <IoIosArrowDown size={20} />}
            </div>
          ))}
        </div>
        <button className="size-[14px] h-auto w-auto pb-4 font-bold text-black">
          Cerrar sesión
        </button>
      </div>
    </aside>
  </>
);

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
