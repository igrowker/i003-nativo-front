import React, { useState, ChangeEvent } from 'react';

interface UserData {
    name: string;
    username: string;
    email: string;
    phone: string;
    cvu: string;
    password: string;
}

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        username: '',
        email: '',
        phone: '',
        cvu: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (userData.name && userData.username) {
            alert("Los datos se han guardado correctamente");
        } else {
            alert("Datos Guardados");
        }
    };

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
                        {userData.email ? (
                            <span className="text-4xl font-bold  text-gray-600">
                                {userData.email
                                    .split('@')[0]
                                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                                    .split(' ')
                                    .map(word => word[0])
                                    .join('')}
                            </span>
                        ) : (
                            <span className="text-2xl text-gray-600">U</span>
                        )}
                    </div>
                </div>
                <h2 className="mt-4 text-2xl  font-semi-bold text-black">{userData.email.split('@')[0] || 'Nombre'}</h2>
                <p className="text-black font-bold">{userData.email || 'Usuario'}</p>
            </div>

            <div className="p-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvu">
                    Mi CVU
                </label>
                <input
                    type="text"
                    name="cvu"
                    value={userData.cvu}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                    placeholder="CVU"
                />

                <h3 className="text-lg   mb-2">Editar datos personales</h3>
                <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                    Editar Email
                </label>
                <div className="relative mb-4">
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Email"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4352 2.72876C16.0634 2.72977 15.6954 2.80434 15.3525 2.94818C15.0096 3.09201 14.6986 3.30226 14.4373 3.56682L3.56589 14.4376L3.52327 14.6528L2.77114 18.434L2.55664 19.4433L3.56658 19.2288L7.34783 18.4766L7.56233 18.4333L18.4338 7.56257C18.6991 7.30182 18.9099 6.99083 19.0537 6.64775C19.1976 6.30467 19.2717 5.93638 19.2717 5.56435C19.2717 5.19233 19.1976 4.82404 19.0537 4.48096C18.9099 4.13788 18.6991 3.82689 18.4338 3.56613C18.1723 3.30162 17.8612 3.09144 17.5182 2.94773C17.1752 2.80401 16.8071 2.72959 16.4352 2.72876ZM16.4352 4.03913C16.7817 4.03913 17.131 4.19726 17.4665 4.53345C18.1354 5.2017 18.1354 5.92701 17.4665 6.59595L16.9728 7.06826L14.931 5.02707L15.404 4.53345C15.7401 4.19726 16.0887 4.03913 16.4352 4.03913ZM13.965 5.99438L16.0055 8.03557L7.69158 16.3488C7.24324 15.4703 6.52854 14.7561 5.6497 14.3083L13.965 5.99438ZM4.7697 15.4262C5.17667 15.5898 5.54635 15.834 5.85649 16.1441C6.16664 16.4542 6.41083 16.8239 6.57439 17.2309L4.31802 17.6819L4.7697 15.4262Z" fill="#D3D2D2" />
                        </svg>
                    </span>
                </div>

                <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                    Editar Contraseña
                </label>
                <div className="relative mb-4">
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Contraseña"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4352 2.72876C16.0634 2.72977 15.6954 2.80434 15.3525 2.94818C15.0096 3.09201 14.6986 3.30226 14.4373 3.56682L3.56589 14.4376L3.52327 14.6528L2.77114 18.434L2.55664 19.4433L3.56658 19.2288L7.34783 18.4766L7.56233 18.4333L18.4338 7.56257C18.6991 7.30182 18.9099 6.99083 19.0537 6.64775C19.1976 6.30467 19.2717 5.93638 19.2717 5.56435C19.2717 5.19233 19.1976 4.82404 19.0537 4.48096C18.9099 4.13788 18.6991 3.82689 18.4338 3.56613C18.1723 3.30162 17.8612 3.09144 17.5182 2.94773C17.1752 2.80401 16.8071 2.72959 16.4352 2.72876ZM16.4352 4.03913C16.7817 4.03913 17.131 4.19726 17.4665 4.53345C18.1354 5.2017 18.1354 5.92701 17.4665 6.59595L16.9728 7.06826L14.931 5.02707L15.404 4.53345C15.7401 4.19726 16.0887 4.03913 16.4352 4.03913ZM13.965 5.99438L16.0055 8.03557L7.69158 16.3488C7.24324 15.4703 6.52854 14.7561 5.6497 14.3083L13.965 5.99438ZM4.7697 15.4262C5.17667 15.5898 5.54635 15.834 5.85649 16.1441C6.16664 16.4542 6.41083 16.8239 6.57439 17.2309L4.31802 17.6819L4.7697 15.4262Z" fill="#D3D2D2" />
                        </svg>
                    </span>
                </div>

                <label className="block text-gray-700 text-sm mb-2" htmlFor="phone">
                    Editar Número de teléfono
                </label>
                <div className="relative mb-4">
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Número de teléfono"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4352 2.72876C16.0634 2.72977 15.6954 2.80434 15.3525 2.94818C15.0096 3.09201 14.6986 3.30226 14.4373 3.56682L3.56589 14.4376L3.52327 14.6528L2.77114 18.434L2.55664 19.4433L3.56658 19.2288L7.34783 18.4766L7.56233 18.4333L18.4338 7.56257C18.6991 7.30182 18.9099 6.99083 19.0537 6.64775C19.1976 6.30467 19.2717 5.93638 19.2717 5.56435C19.2717 5.19233 19.1976 4.82404 19.0537 4.48096C18.9099 4.13788 18.6991 3.82689 18.4338 3.56613C18.1723 3.30162 17.8612 3.09144 17.5182 2.94773C17.1752 2.80401 16.8071 2.72959 16.4352 2.72876ZM16.4352 4.03913C16.7817 4.03913 17.131 4.19726 17.4665 4.53345C18.1354 5.2017 18.1354 5.92701 17.4665 6.59595L16.9728 7.06826L14.931 5.02707L15.404 4.53345C15.7401 4.19726 16.0887 4.03913 16.4352 4.03913ZM13.965 5.99438L16.0055 8.03557L7.69158 16.3488C7.24324 15.4703 6.52854 14.7561 5.6497 14.3083L13.965 5.99438ZM4.7697 15.4262C5.17667 15.5898 5.54635 15.834 5.85649 16.1441C6.16664 16.4542 6.41083 16.8239 6.57439 17.2309L4.31802 17.6819L4.7697 15.4262Z" fill="#D3D2D2" />
                        </svg>
                    </span>
                </div>



                <button
                    className="w-full bg-[#FFC905] text-black py-2 px-5 rounded-full shadow-md"
                    onClick={handleSubmit}
                >
                    Guardar cambios
                </button>


                <button className="w-full mt-4  text-black-500">Cerrar sesión</button>
            </div>

        </div>
    );
};

export default Profile;
