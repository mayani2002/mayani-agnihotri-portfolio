'use client';

import RightVerticalNav from './_components/RightVerticalNav'; // New import
import LeftSidebar from "./_components/LeftSidebar";
import Footer from "./_components/Footer";
import ThemeDebug from "./_components/ThemeDebug";

export default function Home() {
  return (
    <>
      <LeftSidebar />
      <RightVerticalNav />
      {/* <ThemeDebug /> */}
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 surface">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        </main>

      </div>
    </>
  );
}
