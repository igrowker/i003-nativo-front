import { FaRegCopyright } from "react-icons/fa6";
import { links, linksLogged, linksNotLogged } from "../utils/footerRoutes";
import useUserStore from "../store/useUserStore";
import useSmoothNavigate from "../hooks/useSmoothNavigate";

export const Footer: React.FC = () => {
  const smoothNavigate = useSmoothNavigate();
  const token = useUserStore((state) => state.token);
  const userActive = token !== null;

  const siteMapLinks = userActive ? linksLogged : linksNotLogged;

  const handleNavigate = (path: string) => {
    smoothNavigate(path);
  };

  return (
    <footer className="bg-primary-green py-2 font-lato">
      <div className="mx-auto w-[340px]">
        <button
          onClick={() => handleNavigate(userActive ? "/dashboard" : "/")}
          key="home"
        >
          <img
            src="./nativo-footer.png"
            alt="logo"
            width={285}
            height={65}
            className="pb-5 drop-shadow-logo"
          />
        </button>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h5 className="text-[13px] font-bold">Mapa de sitio</h5>
            {siteMapLinks.map((link, index) => (
              <button
                onClick={() => handleNavigate(link.path!)}
                key={index}
                className="text-start text-[11px] font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {links.map((link, index) => (
              <button
                onClick={() => handleNavigate(link.path!)}
                key={index}
                className="text-start text-[13px] font-bold"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
        <p className="pt-2 text-[10px] tracking-[0.5px]">
          Todos los derechos reservados{" "}
          <FaRegCopyright className="inline-block" /> 2024 - NATIVO Banco Rural
        </p>
      </div>
    </footer>
  );
};
