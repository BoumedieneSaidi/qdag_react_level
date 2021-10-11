import {Link} from 'react-router-dom'
const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>QDAG IN ACTION</h1>
            <div className="links">
                  <Link to ="/">Home</Link>
                  <Link to ="/create">Run QDAG</Link>
            </div>
        </nav>
    );
}
export default Navbar;