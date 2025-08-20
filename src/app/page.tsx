'use client';

import RightVerticalNav from './_components/RightVerticalNav'; // New import
import LeftSidebar from "./_components/LeftSidebar";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      {/* <LeftSidebar /> */}
      <RightVerticalNav />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        </main>
       
      </div>
    </>
  );
}
