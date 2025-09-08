import { Heart, Send, Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-6 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col space-y-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400">vidjoy</h1>

        {/* Links with icons */}
        <div className="flex items-center space-x-6 text-sm">
          <a href="#" className="flex items-center space-x-2 hover:text-white">
            <Send size={16} /> <span>Donate to us</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-white">
            <Gamepad2 size={16} /> <span>DMCA</span>
          </a>
        </div>

       {/* Credits */}
<p className="text-sm text-gray-400">
  Made with <span className="text-red-500">❤️</span> by kurkure &amp; nameless monster
</p>

        {/* Original site */}
        <p className="text-xs text-gray-500">
          Original site :{" "}
          <a href="https://vidjoy.pro" className="hover:text-blue-400">
            https://vidjoy.pro
          </a>
        </p>
      </div>
    </footer>
  );
}
