'use client';

import SearchInput from "@/components/SeachInput";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[rgb(32,33,36,68%)] px-4">
      <section className="flex-grow relative flex flex-col items-center mt-40 md:mt-[280px] w-full max-w-screen-sm mx-auto">
        <div className="mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png"
            alt="Google Logo"
            className="w-48"
          />
        </div>

        <SearchInput />
      </section>
    </div>
  );
}