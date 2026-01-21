"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <TodoList />
      <MadeWithDyad />
    </div>
  );
};

export default Index;