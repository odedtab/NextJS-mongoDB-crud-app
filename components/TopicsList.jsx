import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

// Function to fetch topics from the API
const getTopics = async () => {
  try {
    // Fetching topics data from the API
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    // If the response is not okay, throw an error
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

// TopicsList component for displaying a list of topics
export default async function TopicsList() {
  // Fetching topics
  const { topics } = await getTopics();

  // Rendering the list of topics
  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            {/* Rendering the title and description of the topic */}
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            {/* Rendering the RemoveBtn component to remove the topic */}
            <RemoveBtn id={t._id} />
            {/* Rendering a link to edit the topic */}
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
