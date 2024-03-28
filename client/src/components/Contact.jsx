import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [seller, setSeller] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchSeller();
  }, [listing.userRef]);

  console.log(seller);
  return (
    <>
      {seller && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{seller.username}</span> for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Input your message"
            className="w-full border border-grey-200 rounded-lg p-2"
          ></textarea>

          <a
            href={`mailto:${
              seller.email
            }?subject=Regarding ${encodeURIComponent(
              listing.name
            )}&body=${encodeURIComponent(message)}`}
            className="bg-blue-700 text-white text-center uppercase p-3 rounded-lg font-semibold hover:opacity-95"
          >
            Send Message
          </a>
        </div>
      )}
    </>
  );
}
