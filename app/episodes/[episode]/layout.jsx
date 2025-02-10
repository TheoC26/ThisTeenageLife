import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function generateMetadata({ params }) {
  const episodeName = decodeURIComponent(params.episode).replace(/_/g, " ");

  // Fetch episode data from Firestore
  const docRef = doc(db, "episode", episodeName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    return {
      title: `TTL - ${data.title || episodeName}`,
      description:
        data.description || "Listen to this episode of This Teenage Life!",
    };
  }

  return {
    title: `TTL - ${episodeName}`,
    description: "Listen to this episode of This Teenage Life!",
  };
}

const Layout = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
