import React from 'react'

export default function SuccessAlert({message}) {
  return (
      <div className="mt-4 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-3 text-emerald-600 dark:text-emerald-400 text-sm animate-fade-in">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-start flex-1">
              {message}
            </span>
          </div>
  )
}
