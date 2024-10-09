import { Link } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const Profile: React.FC = () => {
  const userData = useUserStore((state) => state.user);

  if (!userData) return;

  return (
    <div className="mx-auto mt-0 max-w-md overflow-hidden rounded-lg bg-white shadow-md md:max-w-2xl">
      <div className="relative m-0 rounded-b-[50px] rounded-t-none bg-[#8EC63F] py-6 text-center">
        <div className="absolute left-4 top-4">
          <button className="flex items-center text-xl font-bold text-black">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <mask
                id="mask0_420_30"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_420_30)">
                <path
                  d="M9.87539 17.0999L4.77539 11.9999L9.87539 6.8999L10.3754 7.3999L6.12539 11.6499H19.2254V12.3499H6.12539L10.3754 16.5999L9.87539 17.0999Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
            Perfil
          </button>
        </div>
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 font-bold">
            <span className="text-4xl font-bold text-gray-600">
              {userData?.name.charAt(0) + userData?.surname.charAt(0)}
            </span>
          </div>
        </div>
        <h2 className="font-semi-bold mt-4 text-2xl text-black">
          {userData.name + " " + userData.surname}
        </h2>
        <p className="font-bold text-black">{userData.email || "Usuario"}</p>
      </div>

      <div className="p-6">
        <p className="mb-2 block text-sm font-bold text-gray-700">CVU</p>

        <p className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow">
          {userData.dni}
        </p>

        <h3 className="mb-2 mt-3 text-lg">Datos personales</h3>
        <p className="mb-2 block text-sm font-bold text-gray-700">Email</p>

        <div className="relative mb-4">
          <p className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow">
            {userData.email}
          </p>
        </div>

        <p className="mb-2 block text-sm font-bold text-gray-700">
          Numero de telefono
        </p>

        <div className="relative mb-4">
          <p className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow">
            {userData.phone}
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            to={"/profile"}
            className="rounded-full bg-[#FFC905] px-5 py-2 text-black shadow-md"
          >
            Guardar cambios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
