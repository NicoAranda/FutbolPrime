import React from "react";
import "../../assets/blog.css";

export const BlogPage = () => {
  const base = import.meta.env.BASE_URL || "/";

  return (
    <div className="blog-wrapper">

      
      <section className="blog-row">
        <div className="blog-info">
          <h2>Flamengo campeón de la Copa Libertadores 2025</h2>
          <p className="fecha">Publicado: 30 de noviembre de 2025</p>
          <p>
            Flamengo derrotó 1–0 a Palmeiras y levantó su cuarto título de Libertadores. El Mengão dominó gran parte del partido y volvió a demostrar su jerarquía internacional, consolidándose como uno de los equipos más fuertes del continente.
          </p>
        </div>
        <img
          className="blog-img"
          src={`${base}img/flamengo.avif`}
          alt="Flamengo campeón"
        />
      </section>

      
      <section className="blog-row reverse">
        <img
          className="blog-img"
          src={`${base}img/1-1.jpg`}
          alt="Arsenal vs Chelsea"
        />
        <div className="blog-info">
          <h2>Arsenal sigue arriba tras empatar con el Chelsea</h2>
          <p className="fecha">Publicado: 30 de noviembre de 2025</p>
          <p>
            Arsenal rescató un 1–1 ante Chelsea en un clásico londinense muy intenso. El resultado permite a los Gunners mantenerse en la lucha por la cima de la Premier League, mientras que Chelsea continúa mostrando una mejora importante en su juego.
          </p>
        </div>
      </section>

     
      <section className="blog-row">
        <div className="blog-info">
          <h2>Messi suma nuevas paradas a su GOAT Tour 2025</h2>
          <p className="fecha">Publicado: 29 de noviembre de 2025</p>
          <p>
            Lionel Messi sorprendió con nuevas paradas para su “GOAT Tour 2025”, donde combina partidos de exhibición, actividades con fanáticos y eventos especiales. El argentino sigue demostrando que su impacto va mucho más allá de la cancha.
          </p>
        </div>
        <img
          className="blog-img"
          src={`${base}img/av.jpeg`}
          alt="Messi GOAT Tour"
        />
      </section>

      
      <section className="blog-row reverse">
        <img
          className="blog-img"
          src={`${base}img/aaaaavv.webp`}  
          alt="Valverde fichaje"
        />
        <div className="blog-info">
          <h2>Valverde en la mira del Manchester United</h2>
          <p className="fecha">Publicado: 29 de noviembre de 2025</p>
          <p>
            Federico Valverde aparece entre los posibles refuerzos del Manchester United para la próxima ventana de fichajes. Aunque todo sigue en rumores, el interés del club inglés ya genera atención en el entorno del Real Madrid.
          </p>
        </div>
      </section>

    </div>
  );
};
