"use client";

import { useState, useEffect } from "react";

type Category = "Work" | "Personal" | "Shopping" | "Health" | "Learning" | "Other";

const categoryKeywords: Record<Category, string[]> = {
  Work: ["meeting", "report", "project", "email", "client", "deadline", "presentation", "office"],
  Personal: ["gym", "workout", "groceries", "shopping", "friends", "family", "appointment", "clean", "laundry", "meal"],
  Shopping: ["buy", "order", "store", "grocery", "online", "purchase"],
  Health: ["doctor", "dentist", "exercise", "meditation", "checkup", "diet"],
  Learning: ["study", "read", "course", "book", "tutorial", "learn"],
  Other: [],
};

export function useAICategorySuggestion(taskText: string): Category {
  const [suggestedCategory, setSuggestedCategory] = useState<Category>("Other");

  useEffect(() => {
    if (!taskText || taskText.trim() === "") {
      setSuggestedCategory("Other");
      return;
    }

    const lowerCaseText = taskText.toLowerCase();
    let foundCategory: Category = "Other";

    for (const category in categoryKeywords) {
      const keywords = categoryKeywords[category as Category];
      if (keywords.some(keyword => lowerCaseText.includes(keyword))) {
        foundCategory = category as Category;
        break;
      }
    }
    setSuggestedCategory(foundCategory);
  }, [taskText]);

  return suggestedCategory;
}