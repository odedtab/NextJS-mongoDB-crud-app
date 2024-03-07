import EditTopicForm from "@/components/EditTopicForm";

// Function to fetch a topic by its ID
const getTopicById = async (id) => {
  try {
    // Fetching topic data from the API
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    // If the response is not OK, throw an error
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    // Return the JSON data of the topic
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Component for editing a topic
export default async function EditTopic({ params }) {
  // Destructuring the ID from the parameters
  const { id } = params;

  // Fetching the topic by its ID
  const { topic } = await getTopicById(id);

  // Destructuring title and description from the fetched topic
  const { title, description } = topic;

  // Rendering the EditTopicForm component with the fetched data
  return <EditTopicForm id={id} title={title} description={description} />;
}
