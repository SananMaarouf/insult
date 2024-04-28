import Image from "next/image";
import { useState } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [insultifiedValue, setInsultifiedValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  function insultify() {
    setInsultifiedValue(alternateCapitalize(inputValue));
  }

  function alternateCapitalize(s) {
    let chars = s.split('');
    if (chars[0] === chars[0].toUpperCase()) {
      chars[0] = chars[0].toLowerCase();
    }
    return chars.map((c, i) => i % 2 !== 0 ? c.toUpperCase() : c.toLowerCase()).join('');
  }

  function clear() {
    setInputValue("");
    setInsultifiedValue("");
    setCopySuccess(false);
  }

  function copy() {
    navigator.clipboard.writeText(insultifiedValue);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }
  return (
    <main className={`${inter.className}`}>
      <div className="w-full h-screen flex items-center  bg-gray-800">
        <div className="mx-auto md:w-3/4 max-w-screen-md text-center flex flex-col text-white">
          <h1 className="text-3xl font-bold underline mb-2">Insultifier</h1>
          <input
            className="border-2 text-black border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a word or phrase to insultify"
          />
          <div className="flex flex-col gap-0 md:gap-2 md:flex-row w-full">
            <button onClick={insultify}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              Insultify!
            </button>
            <button onClick={clear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full">
              Clear
            </button>
          </div>
          <h2 className="text-2xl font-bold underline my-2">Insultified word or phrase:</h2>
          <section className="bg-gray-300 rounded-md min-h-20 text-left p-2 text-black">
            {insultifiedValue}
          </section>
          <button
            onClick={copy}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
            Copy to Clipboard
          </button>
          {copySuccess &&
            <motion.div
              initial={{ opacity: 0, y: -30, }}
              animate={{ opacity: 1, y: 0, }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-green-500">
              <div class="border border-t-0 border-green-300 rounded-b bg-green-100 px-4 py-3 text-green-800">
                <p>Copied to clipboard</p>
              </div>
            </motion.div>
          }
        </div>
      </div>
    </main>
  );
}
