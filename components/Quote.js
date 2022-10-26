import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore/lite";

function Quote({ quote, index }) {
  const [cu, setCu] = useState(0);
  const quotesColRef = collection(db, "quotes");
  const updateCuInDb = async (data) =>
    await setDoc(doc(quotesColRef, quote.id), data);

  useEffect(() => {
    const getCuFromDb = async () => {
      const q = query(quotesColRef, where("id", "==", `${quote.id}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.map((doc) => setCu(doc.data().charlieUttrance));
    };
    quotesColRef && getCuFromDb();
  }, []);

  const handlePlus = () => {
    setCu(cu + 1);
    updateCuInDb({ id: quote.id, charlieUttrance: cu + 1 });
  };

  const handleMinus = () => {
    if (cu > 0) {
      setCu(cu - 1);
      updateCuInDb({ id: quote.id, charlieUttrance: cu - 1 });
    }
  };

  return (
    <div className="border-dotted border-4 p-5 mb-5 hover:bg-[#dbdad8] rounded-xl">
      <h3 className="text-center">
        {index + 1}. {quote.value}
      </h3>
      <div className="flex justify-center">
        <button
          className="bg-[#fdd833] hover:bg-[#fc552a] text-[#15151a] px-3 py-2 rounded-xl mr-5"
          onClick={handleMinus}
        >
          Dislike
        </button>
        <h2 className="mr-5">{cu}</h2>
        <button
          className="bg-[#fdd833] hover:bg-[#fc552a] text-[#15151a] px-3 py-2 rounded-xl"
          onClick={handlePlus}
        >
          Like
        </button>
      </div>
    </div>
  );
}

export default Quote;
