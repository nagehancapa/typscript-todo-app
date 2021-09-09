import React, { useState } from "react";
import { Item } from "../model";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [requiredTags, setRequiredTags] = useState<string[]>([]);
  const [list, setList] = useState<Item[]>([
    {
      id: 0,
      text: "Make this app",
      tags: ["react", "typescript"],
      isDone: false,
    },
    {
      id: 1,
      text: "Fall in love with TypeScript",
      tags: ["romantic", "typescript"],
      isDone: false,
    },
  ]);

  const toggleDone = (id: number) => {
    const updatedItems = list.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setList(updatedItems);
  };

  const tags = Array.from(new Set(list.map((item) => item.tags).flat()));

  const toggleTagFilter = (tag: string) => {
    const isThere = requiredTags.includes(tag);

    if (isThere) {
      const newTags = requiredTags.filter((tagName) => tagName !== tag);
      setRequiredTags(newTags);
    } else {
      setRequiredTags([...requiredTags, tag]);
    }
  };
  console.log(requiredTags);

  const filteredList =
    requiredTags.length === 0
      ? list
      : list.filter((item) =>
          item.tags.some((tag) => requiredTags.includes(tag))
        );

  return (
    <div>
      <div>
        {tags.map((tag) => (
          <button
            style={{
              margin: 5,
              backgroundColor: requiredTags.includes(tag) ? "red" : "",
            }}
            onClick={() => toggleTagFilter(tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>
      <span>Active filters: {requiredTags.join(" -- ")}</span>
      <ul>
        {filteredList.map((item) => (
          <TodoItem item={item} toggleDone={toggleDone} />
        ))}
      </ul>
    </div>
  );
}
