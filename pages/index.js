import Head from "next/head";
import { useState, useEffect } from "react";
import Quote from "../components/Quote";

export default function Home() {
  const [quotes, setQuotes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://api.chucknorris.io/jokes/search?query=cats")
        .then((res) => res.json())
        .then((quotes) => {
          setQuotes(quotes.result);
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Chuck Quotes</title>
      </Head>

      <main className="flex flex-col justify-center items-center border-[#fc552a] border-4 border-dotted m-5 rounded-xl">
        <h1 className="my-5">Chuck Quotes</h1>
        <div className="w-[80%]">
          {isLoading ? (
            <h2>Loading... </h2>
          ) : (
            quotes?.map((q, index) => (
              <Quote quote={q} key={q.id} index={index} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
