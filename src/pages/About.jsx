// Ini adalah halaman About yang berisi tentang informasi dasar tentang website ini. Dan informasi tentang pembuatnya

import React from "react";
import AboutImage from "@/assets/about.webp";
import profile from "@/assets/profile.webp";

export default function About() {
    return (
        <main className="flex flex-col gap-20 w-4/5 md:w-6/10 mx-auto my-[10vh]">
            <section className="flex flex-col md:flex-row items-start gap-10 justify-center text-center">
                <div className="flex flex-col w-full md:w-2/3 items-start justify-start">
                    <h1 className="text-2xl md:text-3xl text-primary font-bold mb-6">Tentang <span className="bg-light rounded-md">CariAja</span></h1>
                    <p className="text-justify text-md md:text-lg">CariAja adalah website pencarian eBook yang dirancang agar dapat digunakan secara instan, cepat, dan tanpa ribet. Dibangun menggunakan framework ReactJS serta memanfaatkan Google Books API sebagai sumber data, CariAja hadir untuk membantu pengguna menemukan buku yang mereka inginkan dengan mudah dan efisien.
                        <br />
                        <br />
                        Website ini dikembangkan sebagai bagian dari lomba Web Design - Designova 2025, dengan tujuan menghadirkan pengalaman mencari eBook yang praktis, modern, dan menyenangkan.</p>
                </div>
                <div className="w-full md:w-1/3"><img src={AboutImage} className="w-full" alt="Gambar Logo CariAja" /></div>
            </section>

            <section className="flex w-full flex-col ">
                <h1 className="text-2xl md:text-3xl text-primary font-bold mb-6">Tentang <span className="bg-light rounded-md">Pembuat</span></h1>
                <div className="bg-[#FFFFFF] flex flex-col clickable md:flex-row border-[1px] border-gray-300 overflow-hidden shadow-lg rounded-xl">
                    <div className="bg-secondary w-full md:w-1/3 flex flex-col justify-center items-center">
                        <img src={profile} className="w-full shadow-lg" />
                    </div>

                    <div className="w-full md:w-2/3 flex flex-col gap-1 justify-center items-start px-5 md:px-10 my-5">
                        <h4 className="text-lg md:text-2xl font-bold text-black">Faiz Faishal N.</h4>
                        <p className="text-lg text-gray-500">Coding Enjoyer</p>

                        <p className="text-justify">I'm a software engineering student who really likes tech stuff. At school, I've learned about design, website development, programming, and soft skills.
                        <br />
                        <br />
                        And now, i’ll try my best to compete in this challenge, whish me luck :)

                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}