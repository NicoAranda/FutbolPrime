import ofertaImg from '../../public/img/oferta.png';
import balonesImg from '../../public/img/ofertabalones.png';
import camisetasImg from '../../public/img/ofertascamisetas.png';
import { Link, NavLink } from "react-router-dom";

const carouselItemStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '400px'
};

export const Carrusel = () => {
    return (
        <>
            <section id="ofertasCarousel" className="carousel slide container my-5" data-bs-ride="carousel">
                <div className="carousel-inner rounded shadow">

                    <Link to="/ofertasPage">
                        <div
                            className="carousel-item active text-center p-5"
                            style={{ ...carouselItemStyle, backgroundImage: `url(${ofertaImg})` }}
                        >
                            {/* Opcional: Contenido del carrusel */}
                        </div>
                    </Link>
                    <a href="balonesPage.html">
                        <div
                            className="carousel-item text-center p-5"
                            style={{ ...carouselItemStyle, backgroundImage: `url(${balonesImg})` }}
                        ></div>
                    </a>

                    <a href="camisetasPage.html">
                        <div
                            className="carousel-item text-center p-5"
                            style={{ ...carouselItemStyle, backgroundImage: `url(${camisetasImg})` }}
                        ></div>
                    </a>
                </div>

                {/* Controles y Navegación (están bien como están) */}
                <button className="carousel-control-prev" type="button" data-bs-target="#ofertasCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#ofertasCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#ofertasCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Oferta 1"></button>
                    <button type="button" data-bs-target="#ofertasCarousel" data-bs-slide-to="1" aria-label="Oferta 2"></button>
                    <button type="button" data-bs-target="#ofertasCarousel" data-bs-slide-to="2" aria-label="Oferta 3"></button>
                </div>
            </section>
        </>
    )
}