
function Header() {
    return (
        <header className="app-header">
            <div className="container">
                <div className="flex items-center justify-between p-4">
                    {/* Logo and App Title */}
                    <div className="flex items-center gap-4">
                        <div className="nutrition-icon calories">
                            🍎
                        </div>
                        <h1 className="text-primary">MacroMate</h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-6">
                        <a href="#" className="text-secondary hover:text-primary transition-colors">Dashboard</a>
                        <a href="#" className="text-secondary hover:text-primary transition-colors">History</a>
                        <a href="#" className="text-secondary hover:text-primary transition-colors">Settings</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
