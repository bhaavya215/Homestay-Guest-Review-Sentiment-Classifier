function Navbar() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Homestay AI
        </h1>

        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/reviews">Reviews</a>
          <a href="/about">About</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;