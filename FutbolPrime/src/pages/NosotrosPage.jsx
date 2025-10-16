import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/nosotros.css';

export const NosotrosPage = () => {
  return (
    <div className="text-center py-5 bg-light">
      <h1 className="titulo mb-5">Team</h1>

      <div className="container d-flex flex-wrap justify-content-center gap-4">
        <div className="box">
          <span></span>
          <div className="content">
            <h2>Sobre nosotros</h2>
            <p>
              Somos fanáticos del fútbol, igual que tú. En <b>FutbolPrime</b> encontrarás todo lo que un verdadero futbolero necesita:
              camisetas originales, balones, accesorios y mucho más. Nos mueve la pasión, la competencia y el estilo de vida que rodea
              al deporte más lindo del mundo. Si el fútbol corre por tus venas, estás en el lugar correcto.
            </p>
          </div>
        </div>

        <div className="box">
          <span></span>
          <div className="content">
            <h2>Nuestra misión</h2>
            <p>
              Llevar el espíritu del fútbol a cada rincón, ofreciendo productos de calidad, diseños auténticos y precios justos.
              Queremos que cada jugador, desde el amateur hasta el profesional, tenga el equipo que necesita para rendir al máximo.
            </p>
          </div>
        </div>

        <div className="box">
          <span></span>
          <div className="content">
            <h2>Nuestros valores</h2>
            <p>
              <b>Pasión:</b> Vivimos y respiramos fútbol. <br />
              <b>Autenticidad:</b> Trabajamos solo con productos originales y de calidad. <br />
              <b>Compromiso:</b> Garantizamos una experiencia de compra rápida y segura. <br />
              <b>Cercanía:</b> Somos parte de la comunidad futbolera, como tú.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
