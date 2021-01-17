import { Link } from 'react-router-dom'


const Navbar = () => {

    return(
        <div className="nav">
        <h3>Shoppie</h3>
        <Link className="link" to="/gloves">Gloves</Link>
        <Link className="link" to="/facemasks">Masks</Link>
        <Link className="link" to="/beanies">Beanies</Link>
        </div>
    )
}

export default Navbar