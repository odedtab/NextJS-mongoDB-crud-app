"use client"; // Indicates that this code runs on the client-side

import { useState } from "react";
import { useRouter } from "next/navigation";

// EditTopicForm component for editing a topic
export default function EditTopicForm({ id, title, description }) {
  // State variables for newTitle and newDescription
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // Accessing Next.js router
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    try {
      // Sending a PUT request to update the topic
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      // Redirecting to the homepage and refreshing the page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  // Rendering the form for editing a topic
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Input field for the topic title */}
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      {/* Input field for the topic description */}
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      {/* Button to submit the form */}
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
