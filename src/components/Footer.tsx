import { FaRegCopyright } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { links, linksLogged, linksNotLogged } from "../utils/footerRoutes";
import useUserStore from "../store/useUserStore";

export const Footer: React.FC = () => {
  const token = useUserStore((state) => state.token);
  const userActive = token !== null;

  return (
    <footer className="bg-primary-green py-2 font-lato">
      <div className="mx-auto w-[340px]">
        <Link to={"/"} key="home">
          <img
            src="./nativo-footer.png"
            alt="logo"
            width={285}
            height={65}
            className="pb-5"
          />
        </Link>
        {userActive && (
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h5 className="text-[13px] font-bold">Mapa de sitio</h5>
              {linksLogged.map((link, index) => (
                <Link
                  to={link.path!}
                  key={index}
                  className="text-[11px] font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {links.map((link, index) => (
                <Link
                  to={link.path!}
                  key={index}
                  className="text-[13px] font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {!userActive && (
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h5 className="text-[13px] font-bold">Mapa de sitio</h5>
              {linksNotLogged.map((link, index) => (
                <Link
                  to={link.path!}
                  key={index}
                  className="text-[11px] font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {links.map((link, index) => (
                <Link
                  to={link.path!}
                  key={index}
                  className="text-[13px] font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        <p className="pt-2 text-[10px] tracking-[0.5px]">
          Todos los derechos reservados{" "}
          <FaRegCopyright className="inline-block" /> 2024 - NATIVO Banco Rural
        </p>
      </div>
    </footer>
  );
};
