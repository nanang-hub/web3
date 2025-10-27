// Ini adalah halaman detail buku yang tampil setelah user klik salah satu card buku. Page ini menampilkan informasi lengkap tentang buku yang dipilih dari Google Books API

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import DOMPurify from "dompurify";

export default function BookDetail() {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);

    //  Bookmark state dari localStorage
    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarked(savedBookmarks.includes(id));
    }, [id]);

    const toggleBookmark = () => {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        let updated;
        if (savedBookmarks.includes(id)) {
            updated = savedBookmarks.filter((bookId) => bookId !== id);
            setBookmarked(false);
        } else {
            updated = [...savedBookmarks, id];
            setBookmarked(true);
        }

        localStorage.setItem("bookmarks", JSON.stringify(updated));
    };

    // Ambil data buku berdasarkan ID
    useEffect(() => {
        window.scrollTo(0, 0);

        async function fetchBook() {
            try {
                const API_KEY = import.meta.env.VITE_API_KEY;
                const res = await fetch(
                    `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
                );
                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }

                const data = await res.json();
                setBook(data);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setLoading(false);
            }
        }


        fetchBook();
    }, [id]);

    // 🔹Skeleton loading
    if (loading)
        return (
            <main className="w-4/5 md:w-6/10 mx-auto mt-[5vh] md:mt-[10vh] animate-pulse">
                {/* Tombol kembali */}
                <div className="my-5 w-fit h-6 bg-gray-300 rounded-md"></div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Skeleton Gambar */}
                    <div className="h-[400px] w-full md:w-4/11 bg-gray-300 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]" />
                    </div>

                    {/* Skeleton Informasi */}
                    <div className="flex flex-col w-full md:w-8/11 gap-6">
                        {/* Judul & Author */}
                        <div className="flex flex-col gap-3">
                            <div className="h-8 w-3/4 bg-gray-300 rounded-md" />
                            <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
                            <div className="h-4 w-1/3 bg-gray-200 rounded-md" />
                        </div>

                        {/* Bookmark button */}
                        <div className="h-10 w-36 bg-gray-300 rounded-lg" />

                        {/* Deskripsi */}
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-full bg-gray-200 rounded-md" />
                            <div className="h-4 w-11/12 bg-gray-200 rounded-md" />
                            <div className="h-4 w-10/12 bg-gray-200 rounded-md" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded-md" />
                        </div>

                        {/* Genre dan tombol preview */}
                        <div className="flex flex-col md:flex-row gap-5 mt-5">
                            <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
                            <div className="h-10 w-40 bg-gray-300 rounded-lg" />
                        </div>

                        {/* Statistik */}
                        <div className="flex justify-between w-full md:w-1/2 mt-5">
                            <div className="flex-1 h-10 bg-gray-200 rounded-md" />
                            <div className="flex-1 h-10 bg-gray-200 rounded-md mx-3" />
                            <div className="flex-1 h-10 bg-gray-200 rounded-md" />
                        </div>
                    </div>
                </div>

                {/* Shimmer bookIdframes */}
                <style>{`
                    @bookIdframes shimmer {
                        0% { background-position: -500px 0; }
                        100% { background-position: 500px 0; }
                    }
                    .animate-[shimmer_1.5s_infinite] {
                        background-size: 1000px 100%;
                    }
                `}</style>
            </main>
        );

    // Jika buku tidak ditemukan
    if (!book)
        return (
            <div className="w-full h-[50vh] flex justify-center items-center ">
                <p className="p-10 text-red-500">Buku tidak ditemukan.</p>
                <a
                    onClick={() => navigate(-1)}
                    className="my-5 text-xl w-fit cursor-pointer active:text-gray-400 hover:text-gray-400 transition"
                >
                    Kembali
                </a>
            </div>
        );

    const info = book.volumeInfo;

    // URL gambar resolusi tinggi
    const originalThumb =
        info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;

    const highResImage = originalThumb
        ? `https://images.weserv.nl/?url=${encodeURIComponent(
            originalThumb
                .replace("zoom=1", "zoom=3")
                .replace("zoom=2", "zoom=3")
                .replace("http://", "")
        )}&w=800&h=1200&fit=cover`
        : "https://placehold.co/300x450?text=No+Image";

    return (
        <main className="w-4/5 md:w-6/10 mx-auto flex flex-col mt-[5vh] md:mt-[10vh]">
            <a
                onClick={() => navigate(-1)}
                className="my-5 text-xl w-fit cursor-pointer active:text-gray-400 hover:text-gray-400 transition"
            >
                &lt;- Kembali
            </a>

            <div className="w-full flex flex-col md:flex-row gap-10 justify-between ">
                {/* image */}
                <div className="h-fit w-full md:w-4/11 p-5 bg-gray-200 rounded-lg">
                    <img
                        src={highResImage}
                        alt={info.title}
                        className="w-full shadow-lg rounded-lg"
                    />
                </div>

                {/* information */}
                <div className="flex w-full md:w-8/11 gap-10 flex-col">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
                        <div className="flex flex-col gap-2 w-full">
                            <h1 className="text-[2rem] font-bold ">
                                {info.title || "Tidak Ada Judul"}
                            </h1>
                            <p className="text-[1.2rem] text-secondary">
                                {info.authors?.join(", ") || "Tidak Ada Penulis"}
                            </p>
                            <p className="text-gray-400">
                                {info.publishedDate || "Tanggal Tidak Diketahui"} ·{" "}
                                {info.publisher || "Tidak diketahui"}
                            </p>
                        </div>
                        <div className="w-fit flex justify-end">
                            <a
                                onClick={toggleBookmark}
                                className="flex items-center text-lg clickable gap-2 cursor-pointer"
                            >
                                <Bookmark
                                    size={18}
                                    className={bookmarked ? "text-primary" : "text-gray-500"}
                                />
                                <span
                                    className={
                                        bookmarked ? "text-primary" : "text-gray-500"
                                    }
                                >
                                    {bookmarked ? "Tersimpan" : "Bookmark"}
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div className="flex gap-2 flex-col">
                        <div
                            className="text-justify line-clamp-10 prose prose-sm md:prose-base max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    info.description ||
                                    "<p>Tidak ada deskripsi tersedia.</p>"
                                ),
                            }}
                        />
                    </div>

                    {/* Genre & Button */}
                    <div className="flex flex-col gap-5 md:flex-row items-center justify-between">
                        <p className="text-primary font-bold line-clamp-1">
                            Genre:{" "}
                            {info.categories
                                ? info.categories
                                    .slice(0, 2)
                                    .join(", ") +
                                (info.categories.length > 2 ? ", ..." : "")
                                : "Tidak ada kategori"}
                        </p>
                        <a
                            href={info.previewLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary w-fit text-nowrap  min-w-[184px] clickable text-white rounded-lg px-4 py-2"
                        >
                            Lihat Lebih Lanjut -&gt;
                        </a>
                    </div>

                    {/* Book Stat */}
                    <div className="flex w-full md:w-1/2 md:justify-start items-center text-center text-blue-600 pb-2">
                        <div className="flex-1">
                            <p className="font-semibold text-lg">
                                {info.pageCount
                                    ? new Intl.NumberFormat("id-ID").format(
                                        info.pageCount
                                    )
                                    : "?"}
                            </p>
                            <p className="text-gray-500 text-sm">Halaman</p>
                        </div>

                        <div className="h-6 border-r border-gray-300 mx-4"></div>

                        <div className="flex-1">
                            <p className="font-semibold text-lg">
                                {info.averageRating || "-"}
                            </p>
                            <p className="text-gray-500 text-sm">Rating</p>
                        </div>

                        <div className="h-6 border-r border-gray-300 mx-4"></div>

                        <div className="flex-1">
                            <p className="font-semibold text-lg">
                                {info.language?.toUpperCase()}
                            </p>
                            <p className="text-gray-500 text-sm">Bahasa</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
