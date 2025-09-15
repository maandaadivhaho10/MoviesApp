import { Link } from "react-router-dom";
import { FaTelegramPlane, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-6 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col space-y-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#3b82f6]">vidjoy</h1>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href="#" className="flex items-center gap-2 text-[#3b82f6]">
            <FaTelegramPlane size={16} /> <span>Donate to us</span>
          </a>

          <a href="#" className="text-[#3b82f6]">
            <FaDiscord size={18} />
          </a>

          <Link to="/dmca" className="text-[#3b82f6]">
            DMCA
          </Link>
        </div>

        {/* Credits */}
        <p className="text-sm text-gray-400">
          Made with <span className="text-red-500">❤️</span> by kurkure &amp; nameless monster
        </p>

        {/* Original site */}
        <p className="text-xs text-gray-500 break-all">
          Original site :{" "}
          <a
            href="https://vidjoy.pro"
            className="text-gray-500 hover:text-[#3b82f6]"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://vidjoy.pro
          </a>
        </p>
      </div>
    </footer>
  );
}
