// Ini adalah halamaan Library yang menampilkan hasil pencarian buku yang diambil dari Google Books API

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import Card from "@/components/Card";

export default function Library() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const maxResults = 8;

    // fungsi ambil data dari API
    async function fetchBooks(reset = false) {
        if (!query) return;

        setLoading(true);
        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const startIndex = reset ? 0 : page * maxResults;

            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
                    query
                )}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`
            );

            const data = await res.json();

            if (reset) {
                setBooks(data.items || []);
            } else {
                setBooks((prev) => [...prev, ...(data.items || [])]);
            }

            // kalau jumlah item kurang dari maxResults, berarti sudah habis
            setHasMore(data.items?.length === maxResults);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setLoading(false);
        }
    }

    // fetch pertama kali saat query berubah
    useEffect(() => {
        setBooks([]);
        setPage(0);
        fetchBooks(true); // ambil dari awal
    }, [query]);

    // fungsi untuk tombol tampilkan lebih banyak
    const handleShowMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBooks(); // ambil data berikutnya
    };

    return (
        <main className="flex flex-col w-4/5 md:w-6/10 mx-auto items-center justify-center my-[10vh]">
            {/* Header pencarian */}
            <div className="mb-[5vh] flex flex-col md:flex-row w-full gap-3 justify-center items-center md:items-start">
                <Search className="text-secondary" size={23} />
                <p className="text-sm md:text-xl text-secondary text-center md:text-left">
                    {loading && books.length === 0
                        ? "Sedang mencari..."
                        : query
                            ? `${books.length} hasil untuk pencarian "${query}"`
                            : "Masukkan kata kunci pencarian"}
                </p>
            </div>

            {/* Daftar Card */}
            <div className="flex flex-wrap justify-between w-full gap-7">
                {!loading && books.length === 0 && query && (
                    <p className="text-gray-500 text-center w-full">
                        Tidak ada hasil ditemukan.
                    </p>
                )}

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

            {/* Tombol tampilkan lebih banyak */}
            {query && !loading && hasMore && (
                <button
                    onClick={handleShowMore}
                    className="mt-[10vh] px-6 py-3 clickable bg-primary text-white rounded-xl hover:bg-opacity-90 transition-all"
                >
                    Tampilkan lebih banyak
                </button>
            )}


            {/* Pesan loading */}
            {loading && books.length > 0 && (
                <p className="text-gray-500 mt-[10vh]">Sedang memuat data...</p>
            )}
        </main>
    );
}
