// ini adalah home page dari website saya, halaman yang pertama kali diakses user, disini anda bisa menemukan rekomendasi buku, kategori populer, dan lain-lain.

import React from "react";
import booksData from "@/data/homepage.json";
import Card from "@/components/Card.jsx";
import CropEffect from "@/assets/cropeffect.webp";
import Bumi from "@/assets/novel1.webp";
import Bisnis from "@/assets/bisnis1.webp";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AuroraText } from "@/components/ui/aurora-text"
import { Meteors } from "@/components/ui/meteors"


export default function Home() {
    const navigate = useNavigate();

    const categoryChange = (query) => {
        navigate(`/library?search=${encodeURIComponent(query)}`);
    }

    return (
        <>
            <header className="relative text-white w-full px-5 h-fit pt-[12vh] pb-[20vh] bg-gradient-to-b from-dark to-primary flex flex-col justify-center items-center">

                <Meteors
                    number={30}
                    className="brightness-150 "
                />


                <h1 className="text-3xl md:text-5xl font-polyb text-wrap h-fit max-w-[35rem] text-center">Nyari <span className="font-polyw">e-book</span> tapi  <span className="bg-white text-primary px-3 rounded-md">ribet</span> & penuh <span className="font-inter italic">drama</span>? Sini, <AuroraText speed={2} colors={["#FFEB00", "#FFBB00", "#EAD809", "#FF7700"]}>
                    CariAja.
                </AuroraText></h1>
                <div
                    className="absolute left-0 bottom-0 w-full h-[50px] md:h-[70px] bg-repeat-x"
                    style={{
                        backgroundImage: `url(${CropEffect})`,
                        backgroundSize: "auto 100%",
                        backgroundPosition: "bottom center",
                    }}
                ></div>
            </header>

            <main className="flex flex-col w-4/5 md:w-6/10 mx-auto gap-[10vh] items-center justify-center mt-10">
                {/* Kategori */}
                <section className="flex flex-col w-full items-center justify-center">
                    <TypingAnimation startOnView className="text-center section-title">Kategori Populer</TypingAnimation>
                    <ul className="w-full flex flex-wrap p-0 items-center justify-center gap-5 mt-5">
                        <button className="category-card" onClick={() => categoryChange("novel")} >Novel & Fiksi</button>
                        <button className="category-card" onClick={() => categoryChange("pendidikan")}>Pendidikan</button>
                        <button className="category-card" onClick={() => categoryChange("Sains")}>Sains</button>
                        <button className="category-card" onClick={() => categoryChange("Bisnis")}>Bisnis & Ekonomi</button>
                        <button className="category-card" onClick={() => categoryChange("Sastra")}>Bahasa & Sastra</button>
                        <button className="category-card" onClick={() => categoryChange("Self-improvement")}>Pengembangan Diri (Self-Help)</button>
                        <button className="category-card" onClick={() => categoryChange("Pentingnya Membaca")}>30+</button>
                    </ul>
                </section>

                {/* Novel & Fiksi */}
                <section className="flex flex-col w-full h-fit">
                    {/* Header judul dan link */}
                    <div startOnView className="flex w-full justify-between items-center mb-5">
                        <TypingAnimation className="section-title">Novel &amp; Fiksi ➡️</TypingAnimation>
                        <a onClick={() => categoryChange("Tetralogi Buru")} className="section-sub">Lihat Semua</a>
                    </div>
                    {/* Daftar card */}
                    <div className="flex flex-wrap justify-between w-full gap-7 ">
                        {booksData.novel_fiksi.map((book) => (
                            <Card
                                key={book.id} // key untuk React
                                bookId={book.id}
                                title={book.title}
                                author={book.authors[0]}
                                img={book.thumbnail}
                                lazy={true}
                            />
                        ))}
                    </div>
                </section>

                {/* Seri Novel Best Seller */}
                <section className="flex w-full flex-col px-5 md:px-10 ">
                    <TypingAnimation startOnView className="section-title mb-5">Seri Novel Best Seller ➡️</TypingAnimation>
                    <div className="bg-[#FFFFFF] flex flex-col clickable md:flex-row border-[1px] border-gray-300 overflow-hidden shadow-lg rounded-xl">
                        <div className="bg-secondary w-full md:w-1/3 flex flex-col justify-center items-center px-5 py-5">
                            <img src={Bumi} alt="Gambar Seri Novel Best Seller" className="max-w-[150px] shadow-lg rounded-lg" />
                        </div>

                        <div className="w-full md:w-2/3 flex flex-col gap-1 justify-center items-start px-5 md:px-10 my-5">
                            <h4 className="text-lg md:text-2xl font-bold text-black">Seri "Dunia Paralel" <span className="italic font-medium">- Tere Liye</span></h4>
                            <p className="text-lg text-gray-500">17 Buku</p>

                            <p className="text-justify line-clamp-4">Seri Bumi karya Tere Liye adalah kisah fantasi populer tentang Raib, Seli, dan Ali, tiga remaja dengan kekuatan istimewa dari dunia paralel bernama Klan Bumi. Melalui petualangan di berbagai dunia seperti Bulan dan Matahari, seri ini menyuguhkan perpaduan sains, aksi, dan nilai persahabatan yang kuat. Ditulis dengan gaya ringan namun penuh makna, seri ini menjadi salah satu karya paling dikenal dari Tere Liye.</p>
                        </div>
                    </div>
                </section>

                {/* Bisnis & Ekonomi */}
                <section className="flex flex-col w-full h-fit">
                    {/* Header judul dan link */}
                    <div className="flex w-full justify-between items-center mb-5">
                        <TypingAnimation startOnView className="section-title mb-5">Bisnis &amp; Ekonomi ➡️</TypingAnimation>
                        <a onClick={() => categoryChange("Rich Dad Poor Dad")} className="section-sub">Lihat Semua</a>
                    </div>
                    {/* Daftar card */}
                    <div className="flex flex-wrap justify-between w-full gap-7 ">
                        {booksData.bisnis_ekonomi.map((book) => (
                            <Card
                                key={book.id} // key untuk React
                                bookId={book.id}
                                title={book.title}
                                author={book.authors[0]}
                                img={book.thumbnail}
                                lazy={true}
                            />
                        ))}
                    </div>
                </section>

                {/* Seri Bisnis & Ekonomi */}
                <section className="flex w-full flex-col px-5 md:px-10 ">
                    <TypingAnimation startOnView className="section-title mb-5">Seri Bisnis &amp; Ekonomi ➡️</TypingAnimation>
                    <div className="bg-[#FFFFFF] flex flex-col clickable md:flex-row border-[1px] border-gray-300 overflow-hidden shadow-lg rounded-xl">
                        <div className="bg-secondary w-full md:w-1/3 flex flex-col justify-center items-center px-5 py-5">
                            <img src={Bisnis} alt="Gambar Seri Buku Bisnis & Ekonomi" className="max-w-[150px] shadow-lg rounded-lg" />
                        </div>

                        <div className="w-full md:w-2/3 flex flex-col gap-1 justify-center items-start px-5 md:px-10 my-5">
                            <h4 className="text-lg md:text-2xl font-bold text-black">Seri "The Rich Dad's" <span className="italic font-medium">- Robert T Kiyosaki</span></h4>
                            <p className="text-lg text-gray-500">7 Buku</p>

                            <p className="text-justify line-clamp-4">Seri Rich Dad adalah kumpulan buku karya Robert T. Kiyosaki yang mengajarkan pendidikan keuangan dan cara berpikir orang kaya. Dimulai dari Rich Dad Poor Dad, seri ini membandingkan pandangan dua ayah tentang uang dan kerja. Buku-buku berikutnya, seperti Cashflow Quadrant dan Rich Dad’s Guide to Investing, memperdalam konsep kebebasan finansial, investasi, serta cara membuat uang bekerja untuk kita.</p>
                        </div>
                    </div>
                </section>

                {/* Pengembangan Diri */}
                <section className="flex flex-col w-full h-fit">
                    {/* Header judul dan link */}
                    <div className="flex w-full justify-between items-center mb-5">
                        <TypingAnimation startOnView className="section-title mb-5">Pengembangan Diri ➡️</TypingAnimation>
                        <a onClick={() => categoryChange("Atomic Habit")} className="section-sub">Lihat Semua</a>
                    </div>
                    {/* Daftar card */}
                    <div className="flex flex-wrap justify-between w-full gap-7 ">
                        {booksData.pengembangan_diri.map((book) => (
                            <Card
                                key={book.id} // key untuk React
                                bookId={book.id}
                                title={book.title}
                                author={book.authors[0]}
                                img={book.thumbnail}
                                lazy={true}
                            />
                        ))}
                    </div>
                </section>

                {/* Call To Action */}
                <section className="w-full flex flex-col justify-center gap-15 items-center">
                    <hr className="w-full border-t-2 border-gray-200" />
                    <div className="w-full md:w-2/3 text-center flex flex-col justify-center items-center gap-7">
                        <BookOpen
                            className="w-8 h-8"
                            style={{
                                stroke: "var(--color-dark)", // pakai warna custom Tailwind
                                fill: "var(--color-dark)",   // tambahkan fill warna juga
                            }}
                        />
                        <h2 className="font-polyb text-primary text-xl md:text-3xl">Ayo Mulai Membaca!</h2>
                        <p className="text-sm md:text-lg">Udah gak ada alasan lagi buat kamu untuk malas mencari dan membaca buku, karena hanya dengan beberapa klik semua bisa teratasi oleh CariAJa.</p>
                        <button className="bg-primary text-white px-6 clickable py-3 rounded-lg" onClick={() => categoryChange("")}>Cari Buku</button>
                    </div>
                    <hr className="w-full border-t-2 border-gray-200" />

                </section>

            </main>
        </>
    );
}