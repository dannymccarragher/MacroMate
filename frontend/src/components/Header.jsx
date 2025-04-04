function Header() {
    return (
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* App Title */}
                <h1 className="text-2xl font-bold">MacroMate</h1>

                {/* Navigation Links */}
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/search" className="hover:underline">Search</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
