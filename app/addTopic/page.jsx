"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  // Using useState hooks to manage the state of 'title' and 'description' inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checking if title or description is empty
    if (!title || !description) {
      alert("Title and Description are Required");
      return;
    }

    try {
      // Sending a POST request to the backend API to create a new topic
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      // If the request is successful, redirect to the homepage and refresh the page
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Rendering the form for adding a new topic
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Input field for the topic title */}
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      ></input>

      {/* Input field for the topic description */}
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      ></input>

      {/* Button to submit the form */}
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
