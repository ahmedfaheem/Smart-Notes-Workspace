import React from "react";

export default function ErrorLoad() {
  return (
    <div className="text-center py-16 text-gray-400 dark:text-gray-600">
      <StickyNote className="w-10 h-10 mx-auto mb-3 opacity-40" />
      <p className="font-medium">Failed to load</p>
    </div>
  );
}
