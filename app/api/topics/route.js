import connectMongoDB from "@/libs/mongodb"; // Importing MongoDB connection function
import Topic from "@/models/topic";
import { NextResponse } from "next/server"; // Importing NextResponse for server-side responses

// POST method for creating a new topic
export async function POST(request) {
  // Destructuring title and description from the request body
  const { title, description } = await request.json();

  // Connecting to MongoDB and creating a new topic
  await connectMongoDB();
  await Topic.create({ title, description });

  // Returning a JSON response indicating the topic has been created
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

// GET method for retrieving all topics
export async function GET() {
  // Connecting to MongoDB and finding all topics
  await connectMongoDB();
  const topics = await Topic.find();

  // Returning a JSON response containing the retrieved topics
  return NextResponse.json({ topics });
}

// DELETE method for deleting a topic
export async function DELETE(request) {
  // Extracting the id from the URL query parameters
  const id = request.nextUrl.searchParams.get("id");

  // Connecting to MongoDB and deleting the topic by id
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);

  // Returning a JSON response indicating the topic has been deleted
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
