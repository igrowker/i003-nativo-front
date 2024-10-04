import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import scroll1 from "../assets/Images/scroll1.png";
import scroll2 from "../assets/Images/scroll2.png";
import scroll3 from "../assets/Images/scroll3.png";
import nativo2 from "../assets/Images/nativo2.png";
import banner from "../assets/Images/banner.png";

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      title: "La mejor manera de fomentar el crecimiento en áreas rurales",
      imageSrc: scroll1,
    },
    {
      title:
        "Haz transacciones seguras, rápidas y sin efectivo, incluso en áreas de baja conectividad.",
      imageSrc: scroll2,
    },
    {
      title:
        "Contribuye al bienestar de tu comunidad: dona, recibe apoyo y crece junto a otros.",
      imageSrc: scroll3,
    },
  ];

  return (
    <div className="app-container mx-auto max-w-[1200px] px-4">
      <img
        src={nativo2}
        alt="Nativo Banco Rural Logo"
        className="mx-auto mb-5 w-48"
      />
      <p className="mb-10 mt-5 text-center text-lg font-bold text-black md:text-xl">
        El banco que apoya el crecimiento de las comunidades mediante la
        cooperación y la colaboración
      </p>

      <Carousel
        interval={3000}
        indicators={false}
        controls={false}
        onSlide={(eventKey: number) => setCurrentSlide(eventKey)}
        className="relative w-full"
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div
              className="flex flex-col items-center justify-center bg-[#E1F0D7] p-4"
              style={{ minHeight: "450px" }}
            >
              <img
                className="d-block h-full max-h-[400px] w-auto object-contain"
                src={image.imageSrc}
                alt={image.title}
              />
              <div className="mt-4 text-center">
                <h5 className="font-bold text-black">{image.title}</h5>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="relative z-10 -mt-6 flex justify-center">
        {images.map((_, index) => (
          <span
            key={index}
            className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${index === currentSlide ? "bg-green-500" : "bg-gray-300"}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>

      <div className="nativo-banner banner-common mx-auto my-5 w-full max-w-[400px] rounded-3xl border-2 border-[#C9FFB4] bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-xl font-bold text-black">
          ¿Qué esperás para unirte?
        </h2>
        <p className="mb-6 text-lg font-bold text-black">¡Comenzá ya!</p>

        <button className="mb-4 w-full rounded-full bg-[#8EC63F] px-4 py-2 font-semibold text-black transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(142,198,63,0.5)]">
          Iniciar sesión
        </button>

        <button className="w-full rounded-full bg-[#FFD200] px-4 py-2 font-semibold text-black transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(255,210,0,0.5)]">
          Crear cuenta
        </button>
      </div>

      <div className="nativo-banner banner-common mx-auto my-5 w-full max-w-[400px] rounded-3xl border-2 border-[#C9FFB4] bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-xl font-bold text-black">
          Somos NATIVO Banco Rural
        </h2>
        <p className="mb-4 text-base text-black">
          Impulsando comunidades con soluciones bancarias sencillas
        </p>
        <a
          href="#"
          className="relative float-right -mt-2 text-base text-blue-500 after:mt-1 after:block after:h-[1px] after:w-16 after:bg-blue-500"
        >
          Ver más
        </a>
      </div>

      <div className="new-banner banner-common mx-auto my-5 w-full max-w-[600px] rounded-2xl border-2 border-[#C9FFB4] bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-xl font-bold text-black">
          El Banco solidario que fortalece la comunidad
        </h2>

        <div className="banner-content mb-4 flex flex-col items-center justify-center">
          <img src={banner} alt="Icono" className="mb-2 w-12" />
          <p className="text-base text-black">
            Impulsando comunidades con soluciones bancarias sencillas
          </p>
        </div>

        <div className="banner-content mb-4 flex flex-col items-center justify-center">
          <img src={banner} alt="Icono" className="mb-2 w-12" />
          <p className="text-base text-black">
            Línea abierta de microcréditos accesibles
          </p>
        </div>

        <div className="banner-content mb-4 flex flex-col items-center justify-center">
          <img src={banner} alt="Icono" className="mb-2 w-12" />
          <p className="text-base text-black">
            Impulsando comunidades con soluciones bancarias sencillas
          </p>
        </div>

        <a
          href="#"
          className="relative float-right -mt-4 text-base text-blue-500 after:mt-1 after:block after:h-[1px] after:w-16 after:bg-blue-500"
        >
          Ver más
        </a>
      </div>

      <div className="info-section mx-auto my-5 w-full max-w-[1200px] rounded-lg bg-[#E1F0D7] p-6 shadow-md">
        <h2 className="mb-4 text-center text-xl font-bold">
          Nativo te ayuda a ayudar
        </h2>
        <p className="mb-4 text-center text-base">
          Desde Nativo, buscamos fomentar la colaboración, cooperación y ayuda
          mutua entre los miembros de la comunidad, por ello, con NATIVO puedes:
        </p>
        <ul className="mb-4 list-inside list-disc pl-5 text-left text-base">
          <li className="mb-2">
            Solicitar la colaboración de los otros usuarios de Nativo Banco
            Rural.
          </li>
          <li className="mb-2">
            Solicitar un préstamo con una tasa de interés solidaria a la
            comunidad para solucionar tus problemas.
          </li>
          <li className="mb-2">
            Realizar una donación a una caja común cuyos fondos serán
            adjudicados a quien lo necesite.
          </li>
        </ul>
        <a
          href="#"
          className="after:w-30 relative float-right -mt-2 text-sm text-black after:mt-1 after:block after:h-[1px] after:bg-black"
        >
          Más información
        </a>
      </div>
    </div>
  );
};

export default Home;
