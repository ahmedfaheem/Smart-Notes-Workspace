import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/auth";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { editUserName } from "../services/auth";
import { useState } from "react";
import ErrorAlert from "../components/Shared/ErrorAlert";
import SuccessAlert from "../components/Shared/SuccessAlert";

export default function ProfilePage() {
  const token = useSelector((state) => state.auth.token);

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", token],
    queryFn: () => getUserProfile(token),
  });

  const scheam = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheam),
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (newName) => editUserName(token, newName),
    onSuccess: (data) => {
      setSuccessMessage("Name updated successfully!");
    },
    onError: (error) => {
      setSuccessMessage("");
      console.error("Error updating name:", error);
    },
  });

  const handleEditName = (data) => {
     mutate(data.name);
   
    
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h2 className="text-2xl font-semibold tracking-tight mb-8">
        Profile Settings
      </h2>

      <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 mb-6 shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-4 border-gray-300 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-4 border-white dark:border-[#111111] shadow-md"></div>
              <div>
                <h3 className="font-semibold text-xl">{data?.user?.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {data?.user?.email}
                </p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(handleEditName)}>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 ">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    defaultValue={data.user?.name}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 opacity-70 cursor-not-allowed"
                  defaultValue={data.user?.email}
                  disabled
                />
              </div>
              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {isError && <ErrorAlert error={error} />}

               {successMessage && <SuccessAlert message={successMessage} />}
              
            </form>
          </>
        )}
      </div>
    </div>
  );
}
