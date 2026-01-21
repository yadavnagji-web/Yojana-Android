"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 border border-gray-200">
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggleComplete(todo.id)}
          className="h-5 w-5 rounded-md border-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
        />
        <Label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "text-lg font-medium text-gray-800 cursor-pointer",
            todo.completed && "line-through text-gray-500"
          )}
        >
          {todo.text}
        </Label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default TodoItem;