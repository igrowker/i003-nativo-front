interface Link {
  name: string;
  path?: string;
  subpages?: Link[];
}

export const links: Link[] = [
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

export const linksNotLogged: Link[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Sobre nosotros",
    path: "/about",
  },
  {
    name: "Nuestro equipo",
    path: "/team",
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

export const linksLogged: Link[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Sobre nosotros",
    path: "/about",
  },
  {
    name: "Nuestro equipo",
    path: "/team",
  },
  {
    name: "Mi Perfil",
    path: "/profile",
  },
  {
    name: "Mi movimientos",
    path: "/history",
  },
  {
    name: "Mis microcréditos",
    path: "/history-microcredits",
  },
];
