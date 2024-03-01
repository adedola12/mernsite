import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handlefileUpload();
    }
  }, [file]);

  const handlefileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="items-center justify-center p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/.*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profileImage"
          className="rounded-full h-32 w-32 self-center object-cover cursor-pointer"
        />
        <p className="self-center text-sm">
          {fileError ? (
            <span className="text-red-700">
              Image Upload Error (Image must be less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-blue-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-800"> Image Upload Complete</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          value={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          disabled
        />
        <input
          type="email"
          value={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          disabled
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button className="bg-blue-400 text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80">
          UPDATE
        </button>
        <button className="bg-blue-800 text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80">
          CREATE LISTING
        </button>

        <div className="flex gap-5 justify-between my-3">
          <Link>
            <p className="text-red-600">Delete Account</p>
          </Link>
          <Link>
            <p className="text-red-600">Sign out</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
