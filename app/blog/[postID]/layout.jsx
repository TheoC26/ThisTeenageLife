
import React from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { db } from '../../../firebase.js';

export async function generateMetadata({ params, searchParams }) {
  const postID = params.postID;

  const docRef = doc(db, `/posts/`, postID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let data = docSnap.data();

    if (docSnap.data().imageID) {
      const storageRef = ref(storage, `posts/${docSnap.data().imageID}`);
      const url = await getDownloadURL(storageRef);
      data.imageURL = url;
      return {
        title: "This Teenage Life - " + data.title,
        description: data.description,
        image: data.imageURL,
      };
    }

    return {
      title: "This Teenage Life - " + data.title,
      description: data.content,
    };
  }
}

const Layout = ({children}) => {
  return children
}

export default Layout