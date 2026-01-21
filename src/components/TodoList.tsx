"use client";

import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAICategorySuggestion } from "@/hooks/use-ai-category-suggestion"; // Import the new hook

type Category = "Work" | "Personal" | "Shopping" | "Health" | "Learning" | "Other";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category; // Added category field
}

type Filter = "all" | "active" | "completed" | Category;

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedCategoryForNewTodo, setSelectedCategoryForNewTodo] = useState<Category>("Other");

  const suggestedCategory = useAICategorySuggestion(newTodoText); // Use the AI suggestion hook

  // Update selectedCategoryForNewTodo when suggestedCategory changes, but only if the user hasn't manually selected one
  useEffect(() => {
    if (newTodoText.trim() !== "") {
      setSelectedCategoryForNewTodo(suggestedCategory);
    } else {
      setSelectedCategoryForNewTodo("Other");
    }
  }, [suggestedCategory, newTodoText]);

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
      category: selectedCategoryForNewTodo,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");
    setSelectedCategoryForNewTodo("Other"); // Reset category after adding
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
    if (filter !== "all" && ["Work", "Personal", "Shopping", "Health", "Learning", "Other"].includes(filter as Category)) {
      return todo.category === filter;
    }
    return true;
  });

  const hasCompletedTodos = todos.some(todo => todo.completed);

  const categories: Category[] = ["Work", "Personal", "Shopping", "Health", "Learning", "Other"];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl shadow-2xl border border-blue-300">
      <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-10 tracking-tight drop-shadow-md">
        My Smart Task List
      </h1>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          className="flex-grow p-4 text-lg border-2 border-blue-400 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
        />
        <Select onValueChange={(value: Category) => setSelectedCategoryForNewTodo(value)} value={selectedCategoryForNewTodo}>
          <SelectTrigger className="w-full sm:w-[180px] p-4 text-lg border-2 border-blue-400 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-lg border-blue-200">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="rounded-lg hover:bg-blue-50">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={addTodo}
          className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
        >
          <PlusCircle className="h-6 w-6" />
          <span>Add Task</span>
        </Button>
      </div>

      {newTodoText.trim() !== "" && suggestedCategory !== "Other" && (
        <div className="flex items-center justify-center text-blue-700 text-sm mb-6 p-2 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
          <Lightbulb className="h-4 w-4 mr-2" />
          <span>AI Suggestion: <span className="font-semibold">{suggestedCategory}</span></span>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 mb-8">
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
        <Select onValueChange={(value: Filter) => setFilter(value)} value={filter}>
          <SelectTrigger className="w-full sm:w-[150px] rounded-full px-5 py-2 text-base font-semibold border-blue-400 text-blue-700 hover:bg-blue-100 transition-all duration-200">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-lg border-blue-200">
            <SelectItem value="all" className="rounded-lg hover:bg-blue-50">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="rounded-lg hover:bg-blue-50">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center text-gray-600 text-xl italic py-12 bg-white rounded-xl shadow-inner border border-gray-200 flex flex-col items-center justify-center space-y-4">
          {filter === "all" && <ListFilter className="h-12 w-12 text-blue-400" />}
          {filter === "active" && <XCircle className="h-12 w-12 text-red-400" />}
          {filter === "completed" && <CheckCircle2 className="h-12 w-12 text-green-400" />}
          {categories.includes(filter as Category) && <Lightbulb className="h-12 w-12 text-yellow-400" />}
          <p>
            {filter === "all" && "No tasks yet! Add some to get started. 🎉"}
            {filter === "active" && "All tasks are completed! Time for a break. ☕"}
            {filter === "completed" && "No completed tasks in this view. Keep going! 💪"}
            {categories.includes(filter as Category) && `No tasks found in the "${filter}" category.`}
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