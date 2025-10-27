import React, { useState } from "react";
import logo from "@/assets/logo.svg";
import { Menu, X, Bookmark, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState(""); // ← simpan teks pencarian
    const navigate = useNavigate();

    // 🔹 Fungsi saat tombol Enter ditekan
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (query.trim() !== "") {
                navigate(`/library?search=${encodeURIComponent(query)}`);
                setQuery(""); // Kosongkan input setelah pencarian
            } else {
                navigate("/library");
            }
        }
    };

    return (
        <nav className="z-50 flex items-center justify-center px-6 py-6 md:py-10 bg-dark text-white sticky top-0">
            <div className="flex justify-between gap-4 items-center w-[90vw] md:w-[70vw]">

                {/* Logo */}
                <Link to="/" className="w-[clamp(120px,8vw,140px)] clickable hidden md:block">
                    <img
                        className="w-full"
                        src={logo}
                        alt="Logo"
                    />
                </Link>

                {/* Search Bar */}
                <div className="flex items-center bg-white rounded-full overflow-hidden w-full md:max-w-xl">
                    <Search className="text-gray-400 ml-3" size={18} />
                    <input
                        type="text"
                        placeholder="Cari Judul Buku, Penulis"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} // update teks
                        onKeyDown={handleKeyDown} // deteksi Enter
                        className="flex-1 px-3 py-2 text-gray-700 focus:outline-none placeholder:text-sm md:placeholder:text-base"
                    />
                </div>

                {/* Tombol Toggle Menu (Mobile) */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menu */}
                <ul
                    className={`absolute flex flex-col gap-5 md:gap-0 md:flex-row left-0 top-[85px] pt-3 pb-6 lg:py-0 w-full bg-dark text-center lg:static lg:flex lg:w-auto lg:space-x-6 transition-all duration-300 ${
                        isOpen ? "block" : "hidden lg:block"
                    }`}
                >
                    <li className="clickable">
                        <Link to="/library" className="block px-4 py-2">Library</Link>
                    </li>
                    <li className="clickable">
                        <Link to="/bookmark" className="flex items-center justify-center gap-2 px-4 py-2">
                            <Bookmark size={16} /> <span>Bookmark</span>
                        </Link>
                    </li>
                    <li className="clickable">
                        <Link
                            to="/about"
                            className="inline-block px-4 py-2 bg-light text-primary font-medium rounded-full text-nowrap"
                        >
                            Tentang Kami
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    );
}
