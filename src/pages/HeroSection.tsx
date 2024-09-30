import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex h-screen flex-col items-center justify-center text-center"
      style={{
        background: "linear-gradient(135deg, #8ec63f, #009444, #006633)",
      }}
    >
      <div className="mx-auto min-h-[60vh] w-full max-w-[90%] rounded-lg bg-white bg-opacity-80 p-8 shadow-lg sm:max-w-sm">
        <h1 className="mb-4 text-4xl font-bold text-[#009444]">
          Bienvenido a Nativo
        </h1>
        <h2 className="mb-6 text-2xl text-[#30342c]">
          Tu banco digital de confianza
        </h2>

        {/* Imagen de fondo o logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="src/assets/images/nativo.png"
            alt="Logo Nativo"
            className="h-32 w-32 rounded-lg"
          />
        </div>

        {/* Botón de llamada a la acción */}
        <button className="rounded-lg bg-[#ffc906] px-6 py-3 font-bold text-white shadow-md hover:bg-[#ab7c35]">
          Empieza ahora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
