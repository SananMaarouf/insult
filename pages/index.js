import Image from "next/image";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [insultifiedValue, setInsultifiedValue] = useState("");

  function insultify() {
    setInsultifiedValue(alternateCapitalize(inputValue));
  }

  function alternateCapitalize(s) {
    return s.split('').map((c, i) => i % 2 == 0 ? c.toUpperCase() : c.toLowerCase()).join('');
  }

  function clear() {
    setInputValue("");
    setInsultifiedValue("");
  }

  function copy() {
    navigator.clipboard.writeText(insultifiedValue);
  }
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <div className="w-full h-screen flex items-center  bg-gray-800">
        <div className="mx-auto md:w-1/2 text-center flex flex-col text-white">
          <h1 className="text-3xl font-bold underline mb-2">Insultifier</h1>
          <input
            className="border-2 text-black border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a word or phrase to insultify"
          />
          <button onClick={insultify}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Insultify!
          </button>
          <button onClick={clear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
            Clear
          </button>
          <h2 className="text-2xl font-bold underline my-2">Insultified word or phrase:</h2>
          <section className="bg-gray-300 rounded-md min-h-20 text-left p-2 text-black">
            {insultifiedValue}
          </section>
          <button
            onClick={copy}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Copy to Clipboard</button>
        </div>
      </div>
    </main>
  );
}
