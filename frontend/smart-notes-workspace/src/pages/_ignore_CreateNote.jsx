import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Pin, Save, FileText } from "lucide-react";
import BackNav from "../components/Notes/manipulate/BackNav";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../services/notes";
import { useSelector } from "react-redux";


const CATEGORIES = [
  "General",
  "Programming",
  "Work",
  "Study",
  "Personal",
  "Ideas",
];

const STATUS = [
  "Todo",
  "In Progress",
  "Done",
];

export default function CreateNote() {
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  
  const [saved, setSaved] = useState(false);
  
  const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    status: z.enum(STATUS),
    isPinned: z.boolean(),
    category: z.string().optional(),
  });
  const { 
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const isPinned = watch('isPinned', false);
  let content = watch('content', '');

 const {mutate, isLoading, isError, error} = useMutation({
     mutationFn: (data) => createNote(token, data),
     onSuccess: (data) => {
      setSaved(true);
      setTimeout(() => navigate("/dashboard/notes"), 1200);
     },
     onError: (error) => {
      console.error('Error creating note:', error);
     },
 })



  const handleSave = (data) => {

    mutate(data);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back nav */}
 
       {errors && Object.keys(errors).length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          <p className="font-semibold">Please fix the following errors:</p>
          <ul className="list-disc list-inside">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
     
       {isError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          <p className="font-semibold">Error saving note:</p>
          <p>{error.message}</p>
        </div>
      )}

      <BackNav wordCount={wordCount} />

      <form onSubmit={handleSubmit(handleSave)}>
        {/* Card */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden mb-5">
          {/* Title */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-100 dark:border-white/5">
            <input
              type="text"
              placeholder="Note title..."
              {...register("title")}
              className="w-full text-2xl font-bold bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none"
            />
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <textarea
              placeholder="Start writing your note..."
              {...register("content")}
              rows={14}
              className="w-full bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 text-base leading-relaxed resize-none focus:outline-none"
            />
          </div>
        </div>

        {/* Options bar */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
          {/* Status */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-14">
              Status
            </span>
            <div className="flex bg-gray-100 dark:bg-white/5 rounded-xl p-1 gap-1">
              {STATUS.map((s) => (
                <label key={s} className="cursor-pointer relative">
                  <input
                    type="radio"
                    value={s}
                    {...register("status")}
                    className="peer sr-only"
                  />

                  <div
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all text-gray-500 dark:text-gray-400 peer-checked:shadow-sm ${
                      s === "Done"
                        ? "peer-checked:bg-emerald-500 peer-checked:text-white"
                        : "peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white"
                    }`}
                  >
                    {s}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-white/10" />

          {/* Pin */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-14">
              Pin
            </span>

            <label
              className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isPinned
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20"
                  : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-transparent"
              }`}
            >
              <input
                type="checkbox"
                {...register("isPinned")}
                className="sr-only"
              />

              <Pin
                className={`w-3.5 h-3.5 ${isPinned ? "fill-current" : ""}`}
              />
              {isPinned ? "Pinned" : "Not pinned"}
            </label>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-white/10" />

          {/* Category */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-14">
              Category
            </span>
            <select
              {...register("category")}
              className="flex-1 text-xs font-medium bg-gray-100 dark:bg-white/5 border-0 rounded-xl px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard/notes"
            className="px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saved}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {saved ? (
              <>
                <FileText className="w-4 h-4" /> Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Note
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
