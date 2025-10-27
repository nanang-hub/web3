// Ini adalah page Bookmark yang menyimpan buku yang user simpan di localStorage

import React, { useEffect, useState } from "react";
import Card from "@/components/Card"; // komponen tampilan buku
import { useNavigate } from "react-router-dom";

export default function Bookmark() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookmarks() {
            setLoading(true);

            // Ambil ID dari localStorage
            const stored = localStorage.getItem("bookmarks");
            const bookmarkIds = stored ? JSON.parse(stored) : [];

            // Kalau kosong langsung hentikan
            if (bookmarkIds.length === 0) {
                setBooks([]);
                setLoading(false);
                return;
            }

            try {
                // Fetch data untuk setiap ID buku
                const API_KEY = import.meta.env.VITE_API_KEY;
                const fetches = bookmarkIds.map((id) =>
                    fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
                        .then((res) => res.json())
                );

                // Tunggu semua fetch selesai
                const results = await Promise.all(fetches);
                setBooks(results);
            } catch (error) {
                console.error("Gagal memuat bookmark:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBookmarks();
    }, []);

    return (
        <main className="flex flex-col w-4/5 md:w-6/10 mx-auto items-center justify-center my-[10vh]">
            <div className="flex w-full justify-between items-center mb-5">
                <h3 className="section-title">
                    My Bookmark ({books.length} items)
                </h3>
                <a className="section-sub" onClick={() => navigate(-1)} >Kembali -&gt;</a>
            </div>

            {/* Loading */}
            {loading && <p className="text-gray-500">Sedang memuat bookmark...</p>}

            {/* Tidak ada data */}
            {!loading && books.length === 0 && (
                <div className="w-full gap-5 flex flex-col px-5 py-20 items-center justify-center border-2 rounded-lg border-dashed border-primary">
                    <h2 className="text-[1.3rem] md:text-[1.5rem] font-bold text-primary">Rak Bukumu Kosong!</h2>
                    <p className="text-center">Kamu bisa menyimpan buku Fav-mu disini. &hearts;</p>
                    <button className=" px-5 py-2 clickable bg-primary text-white rounded-xl hover:bg-opacity-90 transition-all" onClick={() => navigate("/library")} >Cari Buku</button>
                </div>
            )}

            {/* Daftar buku */}
            <div className="flex flex-wrap justify-between w-full gap-7">
                {books.map((book) => (
                    <Card
                        key={book.id}
                        bookId={book.id}
                        title={book.volumeInfo?.title}
                        author={book.volumeInfo?.authors?.[0]}
                        img={book.volumeInfo?.imageLinks?.thumbnail}
                        lazy={true}
                    />
                ))}
            </div>
        </main>
    );
}
