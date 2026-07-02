import React from "react";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
   <div className="bg-gray-50 text-gray-900 dark:bg-[#0A0A0A] dark:text-gray-100 min-h-screen flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl shadow-sm p-8 animate-fade-in relative overflow-hidden">
         {/* Subtle background glow for auth forms */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-indigo-500/5 to-transparent dark:from-indigo-500/10 pointer-events-none"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
