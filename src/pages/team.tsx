import TeamPng from "../assets/Images/team.png";
import IconPng from "../assets/Images/icon.png";
import { teamData } from "../data/teamData";
import TeamMemberCard from "../components/about/TeamMemberCard";

const Team: React.FC = () => {
  return (
    <main className="mx-auto flex w-[442px] flex-col items-center gap-4 font-lato">
      <section className="flex w-full flex-col items-center pb-2 pt-6">
        <h1 className="text-center text-xl font-bold">El equipo de Nativo</h1>
        <img src={TeamPng} alt="Logo" className="pt-2" />
      </section>
      <section className="mx-4 rounded-[20px] border-2 border-[#C9FFB4] bg-white px-6 py-8 drop-shadow-box">
        <h2 className="w-4/5 pb-6 text-xl font-bold leading-6">
          Nuestro equipo detrás de Nativo Banco Rural
        </h2>
        <p className="leading-[19px]">
          La creación de Nativo Banco Rural fue posible gracias a un equipo
          multidisciplinario comprometido con la innovación y el desarrollo de
          soluciones para la inclusión financiera en comunidades rurales. Cada
          miembro jugó un papel clave en garantizar que la app cumpla con los
          más altos estándares de usabilidad, accesibilidad y funcionalidad.
        </p>
      </section>
      <section className="w-full bg-light-green px-4 py-5">
        <img src={IconPng} alt="Logo Nativo" className="mx-auto" />
        <ul className="flex list-disc flex-col gap-6 py-2 pl-4 leading-[19px]">
          <li>
            <span className="font-bold">Diseñadores UX/UI:</span> Trabajaron en
            crear una experiencia intuitiva, adaptada a las necesidades de los
            usuarios rurales, diseñando interfaces claras, accesibles y fáciles
            de usar.
          </li>
          <li>
            <span className="font-bold">Front-end Developers:</span> Se
            encargaron de implementar las interfaces y asegurar que la
            experiencia visual y de interacción fuera fluida, incluso en
            condiciones de conectividad limitada.
          </li>
          <li>
            <span className="font-bold">Back-end Developers:</span> Diseñaron y
            desarrollaron la arquitectura que sostiene la app, garantizando la
            seguridad y eficiencia de las operaciones bancarias y colaborativas.
          </li>
          <li>
            <span className="font-bold">Quality Assurance (QA):</span> Probaron
            exhaustivamente la app en todas sus funcionalidades, asegurando que
            la experiencia sea robusta y libre de errores para los usuarios.
          </li>
          <li>
            <span className="font-bold">Product Manager (PM):</span> Coordinó el
            desarrollo del proyecto, facilitando la comunicación entre todos los
            equipos y asegurando que los objetivos del producto se alinearan con
            las necesidades del usuario.
          </li>
        </ul>
        <img src={IconPng} alt="Logo Nativo" className="mx-auto mb-4" />
        <div className="rounded-[30px] bg-primary-green px-6 py-6 drop-shadow-box">
          <h3 className="mb-4 text-center text-lg font-medium">Conócenos</h3>
          <div className="rounded-[20px] bg-light-green px-5 py-7 drop-shadow-box">
            {teamData.map((member) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                photo={member.photo}
                linkedin={member.linkedin}
              />
            ))}
          </div>
        </div>
        <img src={IconPng} alt="Logo Nativo" className="mx-auto mt-4" />
      </section>
    </main>
  );
};

export default Team;
