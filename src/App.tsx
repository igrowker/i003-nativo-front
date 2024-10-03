import React, { useState } from 'react';
import MainCard from './components/MainCard';
import './App.css';
import scroll1 from './assets/Images/scroll1.png';
import scroll2 from './assets/Images/scroll2.png';
import scroll3 from './assets/Images/scroll3.png';
import banner from './assets/Images/banner.png';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { title: 'La mejor manera de fomentar el crecimiento en áreas rurales', imageSrc: scroll1 },
    { title: 'Haz transacciones seguras, rápidas y sin efectivo, incluso en áreas de baja conectividad.', imageSrc: scroll2 },
    { title: 'Contribuye al bienestar de tu comunidad: dona, recibe apoyo y crece junto a otros.', imageSrc: scroll3 },
  ];

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="app-container">
     
        <p className="tagline">El banco que apoya el crecimiento de las comunidades mediante la cooperación y la colaboración</p>

        {/* Carrusel */}
        <div className="carousel-container">
          <div className="card-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {images.map((image, index) => (
              <MainCard key={index} title={image.title} imageSrc={image.imageSrc} />
            ))}
          </div>

          {/* Puntitos de navegación */}
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Nueva tarjeta debajo del carrusel */}
        <div className="nativo-banner banner-common">
          <h2>Somos NATIVO Banco Rural</h2>
          <p>Impulsando comunidades con soluciones bancarias sencillas</p>
          <a href="#">Ver más</a>
        </div>

        {/* Nuevo banner */}
        <div className="new-banner banner-common">
          <h2>El Banco solidario que fortalece la comunidad</h2>

          {/* Primer bloque con ícono y texto */}
          <div className="banner-content">
            <p>Impulsando comunidades con soluciones bancarias sencillas</p>
            <img src={banner} alt="Icono" className="icon" />
          </div>

          {/* Segundo bloque con ícono y texto */}
          <div className="banner-content">
            <p>Línea abierta de microcréditos accesibles</p>
            <img src={banner} alt="Icono" className="icon" />
          </div>

          {/* Tercer bloque con ícono y texto */}
          <div className="banner-content">
            <p>Impulsando comunidades con soluciones bancarias sencillas</p>
            <img src={banner} alt="Icono" className="icon" />
          </div>

          <a href="#">Ver más</a>
        </div>

        {/* Sección debajo de los banners */}
        <div className="info-section">
          <h2>Nativo te ayuda a ayudar</h2>
          <p>
            Desde Nativo, buscamos fomentar la colaboración, cooperación y ayuda mutua entre los miembros de la comunidad,
            por ello, con NATIVO puedes:
          </p>
          <ul>
            <li>Solicitar la colaboración de los otros usuarios de Nativo Banco Rural.</li>
            <li>Solicitar un préstamo con una tasa de interés solidaria a la comunidad para solucionar tus problemas.</li>
            <li>Realizar una donación a una caja común cuyos fondos serán adjudicados a quien lo necesite.</li>
          </ul>
          <a href="#more-info">Más información</a>
        </div>

      </div>
   
  );
};

export default App;
