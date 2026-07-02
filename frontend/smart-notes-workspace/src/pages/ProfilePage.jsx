
export default function ProfilePage() {
  return (
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Profile Settings</h2>
        
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-4 border-white dark:border-[#111111] shadow-md"></div>
            <div>
              <h3 className="font-semibold text-xl">Demo User</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">demo@workspace.com</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">First Name</label>
                <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" defaultValue="Demo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last Name</label>
                <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" defaultValue="User" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
              <input type="email" className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 opacity-70 cursor-not-allowed" defaultValue="demo@workspace.com" disabled />
            </div>
            <div className="pt-6 flex justify-end">
              <button type="button" className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
  );
}