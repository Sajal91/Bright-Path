import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <div className="animate-fade-in">
            <h1 className="mx-auto max-w-4xl font-display text-responsive-xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Discover Your{' '}
              <span className="relative whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                  preserveAspectRatio="none"
                >
                  <path d="m203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
                <span className="relative">Perfect Career</span>
              </span>{' '}
              Path
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700">
              Get personalized career recommendations based on your interests, skills, and aspirations. 
              Make informed decisions about your future with our AI-powered career guidance platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center rounded-full py-4 px-8 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
                <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="group inline-flex ring-1 items-center justify-center rounded-full py-4 px-8 text-sm focus:outline-none ring-gray-200 text-gray-700 hover:text-gray-900 hover:ring-gray-300 active:bg-gray-100 active:text-gray-600 focus-visible:outline-blue-600 focus-visible:ring-gray-300 transition-all duration-200 hover:shadow-md"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-20 dark:opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative right-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 bg-gradient-to-tl from-purple-400 to-pink-600 opacity-20 dark:opacity-10 sm:right-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-responsive-lg font-bold tracking-tight text-gray-900">
              Why Choose Bright Path?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform uses advanced AI to provide personalized career guidance
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative group animate-slide-in">
              <div className="bg-white h-full min-h-[300px] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-6 shadow-lg">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced algorithms analyze your interests, skills, and preferences to provide accurate career recommendations tailored just for you.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white h-full min-h-[300px] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-6 shadow-lg">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Guidance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get tailored career paths based on your unique profile, including educational requirements, salary expectations, and growth opportunities.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white h-full min-h-[300px] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white mb-6 shadow-lg">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Insights</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access up-to-date information about career trends, job markets, educational opportunities, and industry developments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h2 className="text-responsive-lg font-bold tracking-tight text-white">
              Ready to Start Your Career Journey?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect career path with Bright Path. 
              Take the first step towards your dream career today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full py-4 px-8 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full py-4 px-8 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 border-2 border-white text-white hover:bg-white hover:text-gray-900 active:bg-gray-100 focus-visible:outline-white transition-all duration-200 hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Bright Path</span>
                <p className="text-xs text-gray-500 font-medium">Career Guidance Platform</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 Bright Path. Your journey to the perfect career starts here.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
