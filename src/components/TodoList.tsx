"use client";

import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, CheckCircle2, XCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoText.trim() === "") {
      showError("Task description cannot be empty!");
      return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");
    showSuccess("Task added successfully!");
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    showSuccess("Task status updated!");
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    showSuccess("Task deleted!");
  };

  const editTodo = (id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    showSuccess("Task updated!");
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    showSuccess("Completed tasks cleared!");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl shadow-2xl border border-blue-300">
      <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-10 tracking-tight drop-shadow-md">
        My Smart Task List
      </h1>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          className="flex-grow p-4 text-lg border-2 border-blue-400 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
        />
        <Button
          onClick={addTodo}
          className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <PlusCircle className="h-6 w-6" />
          <span>Add Task</span>
        </Button>
      </div>

      <div className="flex justify-center space-x-3 mb-8">
        <Button
          variant="outline"
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full px-5 py-2 text-base font-semibold transition-all duration-200",
            filter === "all"
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
              : "border-blue-400 text-blue-700 hover:bg-blue-100"
          )}
        >
          All
        </Button>
        <Button
          variant="outline"
          onClick={() => setFilter("active")}
          className={cn(
            "rounded-full px-5 py-2 text-base font-semibold transition-all duration-200",
            filter === "active"
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
              : "border-blue-400 text-blue-700 hover:bg-blue-100"
          )}
        >
          Active
        </Button>
        <Button
          variant="outline"
          onClick={() => setFilter("completed")}
          className={cn(
            "rounded-full px-5 py-2 text-base font-semibold transition-all duration-200",
            filter === "completed"
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
              : "border-blue-400 text-blue-700 hover:bg-blue-100"
          )}
        >
          Completed
        </Button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center text-gray-600 text-xl italic py-12 bg-white rounded-xl shadow-inner border border-gray-200 flex flex-col items-center justify-center space-y-4">
          {filter === "all" && <ListFilter className="h-12 w-12 text-blue-400" />}
          {filter === "active" && <XCircle className="h-12 w-12 text-red-400" />}
          {filter === "completed" && <CheckCircle2 className="h-12 w-12 text-green-400" />}
          <p>
            {filter === "all" && "No tasks yet! Add some to get started. 🎉"}
            {filter === "active" && "All tasks are completed! Time for a break. ☕"}
            {filter === "completed" && "No completed tasks in this view. Keep going! 💪"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      )}

      {hasCompletedTodos && (
        <div className="mt-8 text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105"
              >
                Clear Completed Tasks
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove all completed tasks from your list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearCompleted} className="bg-red-500 hover:bg-red-600 rounded-lg">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default TodoList;