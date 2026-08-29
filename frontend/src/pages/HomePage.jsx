
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Cloud icon */}
                <div className="absolute inset-0 rounded-xl bg-blue-600 opacity-10 group-hover:opacity-20 transition" />

                <svg
                  className="w-7 h-7 text-blue-600 transition-transform duration-500 group-hover:-translate-y-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 19H9C6.23858 19 4 16.7614 4 14C4 11.4112 5.96645 9.28205 8.50827 9.02553C9.21634 6.69112 11.3842 5 13.9474 5C17.0803 5 19.632 7.50915 19.7006 10.625C21.6044 11.1478 23 12.8868 23 15C23 17.2091 21.2091 19 19 19H17.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="text-xl font-bold tracking-tight">
                Cloud Storage
              </span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute top-40 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div
          className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Hero */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="w-full grid lg:grid-cols-2 gap-16 items-center py-16">

              {/* Left content */}
              <div className="text-center lg:text-left">
                {/* Animated badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 animate-[fadeIn_0.8s_ease-out]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
                  </span>

                  Secure Cloud File Storage
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Your files.
                  <br />

                  <span className="text-blue-600 inline-block animate-[floatText_3s_ease-in-out_infinite]">
                    Anywhere.
                  </span>
                </h1>

                <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Store, organize, search and share your files securely
                  with Cloud Storage.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-blue-600/20"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
                  >
                    Log In
                  </Link>
                </div>
              </div>

              {/* Animated cloud illustration */}
              <div className="flex justify-center">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96">

                  {/* Outer circles */}
                  <div className="absolute inset-0 rounded-full border border-blue-200/60 animate-[spin_20s_linear_infinite]" />

                  <div
                    className="absolute inset-8 rounded-full border border-indigo-200/60 animate-[spin_15s_linear_infinite_reverse]"
                  />

                  {/* Floating cloud */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative animate-[cloudFloat_3.5s_ease-in-out_infinite]">

                      {/* Cloud glow */}
                      <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150" />

                      {/* Cloud */}
                      <svg
                        className="relative w-52 h-52 sm:w-64 sm:h-64 text-blue-600 drop-shadow-xl"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 19H9C6.23858 19 4 16.7614 4 14C4 11.4112 5.96645 9.28205 8.50827 9.02553C9.21634 6.69112 11.3842 5 13.9474 5C17.0803 5 19.632 7.50915 19.7006 10.625C21.6044 11.1478 23 12.8868 23 15C23 17.2091 21.2091 19 19 19H17.5Z"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="0.8"
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

                  {/* Floating dots */}
                  <span className="absolute top-12 left-10 w-3 h-3 rounded-full bg-blue-400 animate-bounce" />

                  <span
                    className="absolute bottom-20 right-6 w-4 h-4 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: '0.5s' }}
                  />

                  <span
                    className="absolute top-24 right-2 w-2 h-2 rounded-full bg-sky-400 animate-ping"
                    style={{ animationDelay: '1s' }}
                  />

                  <span
                    className="absolute bottom-10 left-20 w-2.5 h-2.5 rounded-full bg-blue-300 animate-pulse"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">
                Everything you need for your files
              </h2>

              <p className="mt-3 text-slate-500">
                Simple and secure cloud file management.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon="☁"
                title="Store Files"
                description="Upload and securely store your files in the cloud."
              />

              <FeatureCard
                icon="📁"
                title="Organize"
                description="Create folders and organize your files easily."
              />

              <FeatureCard
                icon="↗"
                title="Share"
                description="Share your files with controlled access."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Cloud Storage
          </p>
        </div>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes cloudFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes floatText {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
