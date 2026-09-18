import { Link } from 'react-router-dom'

function NavBar() {
    return <div>
        <Link to='/login'> login </Link>
        <Link to='/register'> Register </Link>
    </div>
}

export default NavBar;