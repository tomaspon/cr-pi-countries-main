import { Link } from "react-router-dom"
import style from "./Landing.module.css"
import fondoLanding from '../../assets/fondo.jpg';


const Landing = () => {
    return(
        <div className={style.landingContainer} style={{ background: `url(${fondoLanding})`, backgroundSize: 'contain'}}>
            <div className={style.landingContent}>
                <h1>Countries</h1>
                <p>Explora nuestro mundo a través de nuestra plataforma global, donde puedes descubrir información detallada sobre países y encontrar todo tipo de actividades únicas. La plataforma facilita la búsqueda y creación de aventuras, permitiéndote contribuir con tus propias experiencias. Conéctate con una comunidad global de viajeros, obtén recomendaciones y comienza tu viaje hacia lo desconocido. Únete a nosotros para vivir experiencias diversas desde la comodidad de tu hogar.</p>
            </div>
            <Link to="/home">
            <button className={style.doubleButton}>¡LET'S GO!</button>
            </Link>
        </div>
    )
}

export default Landing