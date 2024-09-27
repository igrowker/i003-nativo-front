import { FaRegCopyright } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Link {
  name: string;
  path?: string;
  subpages?: Link[];
}

const links: Link[] = [
  {
    name: "Contacto",
    path: "/contact",
  },
  {
    name: "Política de privacidad",
    path: "/",
  },
  {
    name: "Aviso legal",
    path: "/",
  },
  { name: "Ayuda", path: "/help" },
];

const linksNotLogged: Link[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Sobre nosotros",
    path: "/about",
  },
  {
    name: "Iniciar sesión",
    path: "/login",
  },
  {
    name: "Registro",
    path: "/register",
  },
];

const linksLogged: Link[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Sobre nosotros",
    path: "/about",
  },
  {
    name: "Mi Perfil",
    path: "/profile",
  },
  {
    name: "Mi historial",
    path: "/historial",
  },
];

const userActive = true; //for testing purposes

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-green py-1 font-lato">
      <div className="mx-auto w-[340px]">
        <img
          src="./nativo-footer.png"
          alt="logo"
          width={285}
          height={65}
          className="pb-5"
        />
        {userActive && (
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
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
            <div className="flex flex-col gap-1">
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
