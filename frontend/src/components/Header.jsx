import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div>
                <div>
                    {/* Logo and App Title */}
                    <div>
                        
                        <h1>MacroMate</h1>
                    </div>

                    {/* Navigation Links */}
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/search">Search</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <button>Sign In</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
