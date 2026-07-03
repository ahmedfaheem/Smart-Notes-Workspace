import React from 'react'

export default function IsLoading() {
  return (
     <div className="flex flex-col items-center justify-center py-32 text-center">
  {/* Increased size, added branding colors, and isolated the spin to just the emoji */}
  <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-6 shadow-sm border border-indigo-100 dark:border-indigo-500/20">
    <span className="text-3xl animate-spin origin-center">⏳</span>
  </div>
  
  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1.5">
    Loading...
  </h3>
  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
    Please wait while we are fetching.
  </p>
</div>
  )
}
