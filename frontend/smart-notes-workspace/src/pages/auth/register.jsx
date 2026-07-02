import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center mx-auto mb-5 font-bold text-2xl shadow-lg">N</div>
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-gray-500 mt-2">Start organizing your thoughts today.</p>
      </div>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Full Name</label>
          <input type="text" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow" placeholder="jane@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Password</label>
          <input type="password" required className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow" placeholder="••••••••" />
        </div>
        <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black font-medium py-2.5 rounded-xl hover:opacity-90 transition-opacity mt-2">Create Account</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-8">
        Already have an account? <Link to="/login" className="text-black dark:text-white font-medium hover:underline">Log in</Link>
      </p>
    </>
  );
}
