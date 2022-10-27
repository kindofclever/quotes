import { db } from "../firebase";
import { useState, useEffect } from "react";

import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore/lite";

function Quote({ quote }) {
  const [cu, setCu] = useState(0);
  const colRef = collection(db, "quotes");
  const updateCuInDb = async (data) =>
    await setDoc(doc(colRef, quote.id), data);

  useEffect(() => {
    const getCuFromDb = async () => {
      const q = query(colRef, where("id", "==", `${quote.id}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => setCu(doc.data().charlieUttrance));
    };
    colRef && getCuFromDb();
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
    <div className="">
      <div>{quote.value}</div>
      <div className="">
        <button onClick={handleMinus}>-</button>
        <p>{cu}</p>
        <button onClick={handlePlus}>+</button>
      </div>
    </div>
  );
}

export default Quote;
