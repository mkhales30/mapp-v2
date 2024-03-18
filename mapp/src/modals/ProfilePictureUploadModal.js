import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "../firebase/firebase"; // Assuming you've exported your Firestore instance as 'db'
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

function ProfilePictureUploadModal({ isOpen, onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      return; // No file selected, do nothing
    }

    try {
      const storage = getStorage(); // Get the Firebase Storage instance
      const fileRef = ref(storage, `profilePictures/${auth.currentUser.uid}`); // Reference to the file in Storage
      await uploadBytes(fileRef, selectedFile); // Upload the file to Storage
      const downloadURL = await getDownloadURL(fileRef); // Get the download URL of the uploaded file

      // Check if the user document already exists in Firestore
      const userDocRef = doc(db, "Users", auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      // If the user document exists, update the profilePictureURL field
      if (userDocSnapshot.exists()) {
        await updateDoc(
          userDocRef,
          {
            profilePictureURL: downloadURL,
          },
          { merge: true }
        ); // Use merge option to preserve existing fields
      } else {
        // If the user document doesn't exist, create it with the profilePictureURL field
        await setDoc(userDocRef, {
          profilePictureURL: downloadURL,
          // You can add other user data fields here if needed
        });
      }

      // Call the onUpload function passed from the appsidebar component
      onUpload(downloadURL);

      // Reset the selectedFile state and close the modal
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <>
      {isOpen && (
        <div className="h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30">
          <div className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
          <div className="absolute grid h-screen w-screen place-items-center">
            <div className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
              <p className="text-2xl text-center">Upload Profile Picture</p>
              <button>
                <FontAwesomeIcon
                  className={" absolute top-2 right-2 w-3 h-3"}
                  onClick={onClose}
                  icon={faTimes}
                />
              </button>
              <input type="file" onChange={handleFileChange} />
              <button
                className="bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg"
                onClick={handleSubmit}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePictureUploadModal;
