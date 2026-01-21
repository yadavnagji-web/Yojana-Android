"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import TodoList from "@/components/TodoList"; // Import the new TodoList component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <TodoList /> {/* Render the TodoList component */}
      <MadeWithDyad />
    </div>
  );
};

export default Index;