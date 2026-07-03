import React from 'react'

export default function ErrorAlert({error}) {
  return (
      <div className="mt-4 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm animate-fade-in">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-start flex-1">
              {error.response?.data?.message ||
                error.message ||
                "An error occurred. Please try again."}
            </span>
          </div>
  )
}
