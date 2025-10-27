import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, author, img, lazy, bookId, }) {
    // Gunakan proxy images.weserv.nl agar gambar bisa tampil
    const proxyImage = img
        ? `https://images.weserv.nl/?url=${encodeURIComponent(
            img
                .replace("http://", "https://")
                .replace("zoom=1", "zoom=2")
        )}`
        : "https://placehold.co/300x450?text=No+Image";

    return (
        <div className="flex flex-col items-start w-[45%] sm:w-[30%] clickable md:w-[220px]" id={bookId}>
            {/* Container gambar dengan aspect ratio */}
            <Link to={`/bookdetail/${bookId}`} className="w-full aspect-[2/3] overflow-hidden shadow-lg  rounded-xl">
                <img
                    src={proxyImage}
                    alt={title || "Tidak Ada Dekskripsi"}
                    className="w-full h-full object-cover"
                    loading={lazy ? "lazy" : "eager"}
                />
            </Link>

            <h4 className="text-md md:text-2xl max-w-[128px] md:max-w-none mt-3 font-medium text-black line-clamp-2">
                {title || "Tidak Ada Judul"}
            </h4>
            <p className="text-gray-500 line-clamp-2 text-xs md:text-[1rem]">{author || "Tidak Ada Penulis"}</p>
        </div>
    );
}