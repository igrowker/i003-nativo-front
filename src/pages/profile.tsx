import { Link } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const Profile: React.FC = () => {
    const userData = useUserStore((state) => state.user)
    console.log(userData)

    if (!userData) return

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl mt-0">
            <div className="relative bg-[#8EC63F] text-center py-6 rounded-b-[50px] m-0 rounded-t-none">
                <div className="absolute top-4 left-4">
                    <button className="text-black font-bold text-xl flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <mask id="mask0_420_30" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_420_30)">
                                <path d="M9.87539 17.0999L4.77539 11.9999L9.87539 6.8999L10.3754 7.3999L6.12539 11.6499H19.2254V12.3499H6.12539L10.3754 16.5999L9.87539 17.0999Z" fill="#1C1B1F" />
                            </g>
                        </svg>
                        Perfil
                    </button>
                </div>
                <div className="flex justify-center">
                    <div className="rounded-full h-24 w-24 flex font-bold items-center justify-center bg-gray-200">

                        <span className="text-4xl font-bold  text-gray-600">
                        {userData?.name.charAt(0) + userData?.surname.charAt(0)}
                        </span>
                    </div>
                </div>
                <h2 className="mt-4 text-2xl  font-semi-bold text-black">{userData.name +" "+ userData.surname}</h2>
                <p className="text-black font-bold">{userData.email || 'Usuario'}</p>
            </div>

            <div className="p-6">
                <p className="block text-gray-700 text-sm font-bold mb-2" >CVU</p>

                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">{userData.dni}</p>

                <h3 className="text-lg   mb-2">Datos personales</h3>
                <p className="block text-gray-700 text-sm font-bold mb-2" >Email</p>

                <div className="relative mb-4">
                    <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">{userData.email}</p>
                </div>

                <p className="block text-gray-700 text-sm font-bold mb-2" >Numero de telefono</p>

                <div className="relative mb-4">
                    <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">{userData.phone}</p>
                </div>

                <Link to={"/profile-edition"}
                    className="w-full bg-[#FFC905] text-black py-2 px-5 rounded-full shadow-md"

                >
                    Editar perfil
                </Link>

            </div>
    </div>
  );
};

export default Profile;
