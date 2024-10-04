import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import scroll1 from '../assets/Images/scroll1.png';
import scroll2 from '../assets/Images/scroll2.png';
import scroll3 from '../assets/Images/scroll3.png';
import nativo2 from '../assets/Images/nativo2.png';
import banner from '../assets/Images/banner.png';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { title: 'La mejor manera de fomentar el crecimiento en áreas rurales', imageSrc: scroll1 },
    { title: 'Haz transacciones seguras, rápidas y sin efectivo, incluso en áreas de baja conectividad.', imageSrc: scroll2 },
    { title: 'Contribuye al bienestar de tu comunidad: dona, recibe apoyo y crece junto a otros.', imageSrc: scroll3 },
  ];

  return (
    <div className="app-container max-w-[1200px] mx-auto px-4">
      <img src={nativo2} alt="Nativo Banco Rural Logo" className="w-48 mx-auto mb-5" />
      <p className="text-lg md:text-xl text-center mt-5 mb-10 font-bold text-black">El banco que apoya el crecimiento de las comunidades mediante la cooperación y la colaboración</p>

      <Carousel
        interval={3000}
        indicators={false}
        controls={false}
        onSlide={(eventKey: number) => setCurrentSlide(eventKey)}
        className="relative w-full"
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="flex flex-col items-center justify-center bg-[#E1F0D7] p-4" style={{ minHeight: '450px' }}>
              <img
                className="d-block w-auto h-full max-h-[400px] object-contain"
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

      <div className="flex justify-center -mt-6 relative z-10">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer mx-1 ${index === currentSlide ? 'bg-green-500' : 'bg-gray-300'}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>

      <div className="nativo-banner banner-common bg-white border-2 border-[#C9FFB4] rounded-3xl p-8 text-center shadow-md w-full max-w-[400px] mx-auto my-5">
        <h2 className="text-xl font-bold text-black mb-4">¿Qué esperás para unirte?</h2>
        <p className="text-lg font-bold text-black mb-6">¡Comenzá ya!</p>

        <button className="bg-[#8EC63F] hover:shadow-[0_0_10px_3px_rgba(142,198,63,0.5)] transition-all duration-300 text-black font-semibold py-2 px-4 rounded-full w-full mb-4">
          Iniciar sesión
        </button>

        <button className="bg-[#FFD200] hover:shadow-[0_0_10px_3px_rgba(255,210,0,0.5)] transition-all duration-300 text-black font-semibold py-2 px-4 rounded-full w-full">
          Crear cuenta
        </button>
      </div>

      <div className="nativo-banner banner-common bg-white border-2 border-[#C9FFB4] rounded-3xl p-8 text-center shadow-md w-full max-w-[400px] mx-auto my-5">
        <h2 className="text-xl font-bold mb-4 text-black">Somos NATIVO Banco Rural</h2>
        <p className="text-base text-black mb-4">Impulsando comunidades con soluciones bancarias sencillas</p>
        <a href="#" className="text-blue-500 text-base float-right relative after:block after:w-16 after:h-[1px] after:bg-blue-500 after:mt-1 -mt-2">Ver más</a>
      </div>

      <div className="new-banner banner-common bg-white border-2 border-[#C9FFB4] rounded-2xl p-6 text-center shadow-md w-full max-w-[600px] mx-auto my-5">
        <h2 className="text-xl font-bold mb-4 text-black">El Banco solidario que fortalece la comunidad</h2>

        <div className="banner-content flex flex-col justify-center items-center mb-4">
          <img src={banner} alt="Icono" className="w-12 mb-2" />
          <p className="text-base text-black">Impulsando comunidades con soluciones bancarias sencillas</p>
        </div>

        <div className="banner-content flex flex-col justify-center items-center mb-4">
          <img src={banner} alt="Icono" className="w-12 mb-2" />
          <p className="text-base text-black">Línea abierta de microcréditos accesibles</p>
        </div>

        <div className="banner-content flex flex-col justify-center items-center mb-4">
          <img src={banner} alt="Icono" className="w-12 mb-2" />
          <p className="text-base text-black">Impulsando comunidades con soluciones bancarias sencillas</p>
        </div>

        <a href="#" className="text-blue-500 text-base float-right relative after:block after:w-16 after:h-[1px] after:bg-blue-500 after:mt-1 -mt-4">Ver más</a>
      </div>

      <div className="info-section bg-[#E1F0D7] p-6 rounded-lg shadow-md w-full max-w-[1200px] mx-auto my-5">
        <h2 className="text-xl font-bold text-center mb-4">Nativo te ayuda a ayudar</h2>
        <p className="text-base mb-4 text-center">
          Desde Nativo, buscamos fomentar la colaboración, cooperación y ayuda mutua entre los miembros de la comunidad, por ello, con NATIVO puedes:
        </p>
        <ul className="list-disc list-inside text-base mb-4 text-left pl-5">
          <li className="mb-2">Solicitar la colaboración de los otros usuarios de Nativo Banco Rural.</li>
          <li className="mb-2">Solicitar un préstamo con una tasa de interés solidaria a la comunidad para solucionar tus problemas.</li>
          <li className="mb-2">Realizar una donación a una caja común cuyos fondos serán adjudicados a quien lo necesite.</li>
        </ul>
        <a href="#" className="text-black text-sm float-right relative after:block after:w-30 after:h-[1px] after:bg-black after:mt-1 -mt-2">Más información</a>

      </div>
    </div>
  );
};

export default Home;



