"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2, PencilLine, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editedText.trim() !== "" && editedText !== todo.text) {
      onEdit(todo.id, editedText.trim());
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md mb-3 border border-blue-100 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center space-x-4 flex-grow">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggleComplete(todo.id)}
          className="h-6 w-6 rounded-full border-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white transition-colors duration-200"
        />
        {isEditing ? (
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 text-lg border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            autoFocus
          />
        ) : (
          <Label
            htmlFor={`todo-${todo.id}`}
            className={cn(
              "text-lg font-medium text-gray-800 cursor-pointer flex-grow",
              todo.completed && "line-through text-gray-500 italic"
            )}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </Label>
        )}
      </div>
      <div className="flex space-x-2 ml-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEdit}
          className="text-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors duration-200"
        >
          {isEditing ? <Check className="h-5 w-5" /> : <PencilLine className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors duration-200"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;