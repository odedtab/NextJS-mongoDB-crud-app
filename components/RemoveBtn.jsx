"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

// RemoveBtn component for removing a topic
export default function RemoveBtn({ id }) {
  // Accessing Next.js router
  const router = useRouter();

  // Function to remove a topic
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    // If user confirms the action
    if (confirmed) {
      // Sending a DELETE request to remove the topic
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });

      // If the response is okay, refresh the page
      if (res.ok) {
        router.refresh();
      }
    }
  };

  // Rendering the button to remove the topic
  return (
    <button onClick={removeTopic} className="text-red-400">
      {/* Rendering the trash icon */}
      <HiOutlineTrash size={24} />
    </button>
  );
}
