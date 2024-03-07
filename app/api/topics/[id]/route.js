import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server"; // Importing NextResponse for server-side responses

// PUT method for updating a topic
export async function PUT(request, { params }) {
  // Destructuring the id from the params object
  const { id } = params;
  // Destructuring newTitle and newDescription from the request body
  const { newTitle: title, newDescription: description } = await request.json();

  // Connecting to MongoDB
  await connectMongoDB();

  // Finding the topic by id and updating its title and description
  await Topic.findByIdAndUpdate(id, { title, description });

  // Returning a JSON response indicating the topic has been updated
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

// GET method for retrieving a topic
export async function GET(request, { params }) {
  // Destructuring the id from the params object
  const { id } = params;

  // Connecting to MongoDB
  await connectMongoDB();

  // Finding the topic by id
  const topic = await Topic.findOne({ _id: id });

  // Returning a JSON response containing the retrieved topic
  return NextResponse.json({ topic }, { status: 200 });
}
