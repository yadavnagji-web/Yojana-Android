"use client";

import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");

  const addTodo = () => {
    if (newTodoText.trim() === "") {
      showError("Todo text cannot be empty!");
      return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");
    showSuccess("Todo added successfully!");
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    showSuccess("Todo status updated!");
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    showSuccess("Todo deleted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl border border-blue-200">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
        My Awesome Todo List
      </h1>

      <div className="flex space-x-3 mb-8">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          className="flex-grow p-3 text-lg border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        />
        <Button
          onClick={addTodo}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add Task</span>
        </Button>
      </div>

      {todos.length === 0 ? (
        <p className="text-center text-gray-600 text-xl italic py-10">
          No tasks yet! Time to add some. 🎉
        </p>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;