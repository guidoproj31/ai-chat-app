export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        <span className="text-[#B666FF] text-xl font-bold">Zapps AI</span>
      </div>
      <div className="flex gap-4">
        <button className="text-white hover:text-[#B666FF]">Sign Up</button>
        <button className="bg-[#B666FF] px-4 py-2 rounded-lg hover:bg-[#9933FF]">
          Log in
        </button>
      </div>
    </nav>
  );
}