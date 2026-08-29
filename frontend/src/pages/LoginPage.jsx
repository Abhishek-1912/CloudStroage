
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);

      localStorage.setItem('token', res.data.token);

      navigate('/drive');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Back to home */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
      >
        <span>←</span>
        Home
      </Link>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-sm">

        {/* Animated logo */}
        <div className="flex flex-col items-center mb-6">

          <Link
            to="/"
            className="group"
          >
            <div className="relative w-20 h-20 flex items-center justify-center">

              {/* Glow */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-xl group-hover:bg-blue-500/20 transition" />

              {/* Icon container */}
              <div className="relative w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-200 flex items-center justify-center animate-[cloudFloat_3s_ease-in-out_infinite]">

                <svg
                  className="w-10 h-10 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 19H9C6.23858 19 4 16.7614 4 14C4 11.4112 5.96645 9.28205 8.50827 9.02553C9.21634 6.69112 11.3842 5 13.9474 5C17.0803 5 19.632 7.50915 19.7006 10.625C21.6044 11.1478 23 12.8868 23 15C23 17.2091 21.2091 19 19 19H17.5Z"
                    fill="currentColor"
                    fillOpacity="0.12"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M9 15L12 12L15 15M12 12V20"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-slate-900">
            Cloud Storage
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Securely access your files
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

          <h2 className="text-xl font-semibold text-slate-900 mb-1">
            Welcome back
          </h2>

          <p className="text-slate-500 text-sm mb-6">
            Log in to your Cloud Storage account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2">
                <p className="text-red-600 text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Signup */}
          <p className="text-sm text-slate-500 mt-6 text-center">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400 text-center mt-5">
          Secure cloud file storage
        </p>
      </div>

      <style>{`
        @keyframes cloudFloat {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-7px);
          }
        }
      `}</style>
    </div>
  );
}