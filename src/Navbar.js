import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand">&ensp; RDF_QDAG &ensp;</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/demo">Demo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/publications">Publications</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
        </nav>
    )
}
export default Navbar;