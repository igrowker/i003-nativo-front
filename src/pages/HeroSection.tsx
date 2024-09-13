import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
    className="h-screen flex flex-col justify-center items-center text-center"
    style={{
      background: 'linear-gradient(135deg, #8ec63f, #009444, #006633)',
    }}>
      <div className="w-full max-w-[90%] sm:max-w-sm min-h-[60vh] mx-auto p-8 bg-white bg-opacity-80 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-[#009444] mb-4">Bienvenido a Nativo</h1>
        <h2 className="text-2xl text-[#30342c] mb-6">Tu banco digital de confianza</h2>
        
        {/* Imagen de fondo o logo */}
        <div className="flex justify-center mb-6">
          <img
            src="src/assets/images/nativo.png"
            alt="Logo Nativo"
            className="w-32 h-32 rounded-lg"/>
        </div>

        {/* Botón de llamada a la acción */}
        <button className="bg-[#ffc906] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#ab7c35]">
          Empieza ahora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
