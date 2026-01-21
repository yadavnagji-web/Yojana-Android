"use client";

import TodoList from "@/components/TodoList";
import { Footer } from "@/components/Footer"; // Using the new Footer component

const TodoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <TodoList />
      <Footer />
    </div>
  );
};

export default TodoPage;