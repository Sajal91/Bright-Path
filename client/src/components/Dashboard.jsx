import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    currentClass: "",
    percentage: "",
    favoriteSubject: "",
    areasOfInterest: "",
    workPreference: "",
    careerValues: "",
    currentLocation: "",
    preferredStudyLocation: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  // useEffect(() => {
  //   // Check authentication
  //   const isAuthenticated = localStorage.getItem('isAuthenticated');
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //     return;
  //   }

  //   // Get user info
  //   const userName = localStorage.getItem('userName');
  //   const userEmail = localStorage.getItem('userEmail');
  //   setUser({ name: userName, email: userEmail });
  // }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CLIENT_URL}/generate`,
        formData
      );

      setRecommendations(response.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      currentClass: "",
      percentage: "",
      favoriteSubject: "",
      areasOfInterest: "",
      workPreference: "",
      careerValues: "",
      currentLocation: "",
      preferredStudyLocation: ""
    });
    setRecommendations(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Career Journey!</h2>
          <p className="text-blue-100">
            Fill out the form below to get personalized career recommendations based on your interests, skills, and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Career Assessment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Career Assessment Form</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="currentClass" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Class/Year
                </label>
                <input
                  type="text"
                  id="currentClass"
                  name="currentClass"
                  value={formData.currentClass}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., 12th, 1st Year, etc."
                />
              </div>

              <div>
                <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Percentage/GPA
                </label>
                <input
                  type="number"
                  id="percentage"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your percentage or GPA"
                />
              </div>

              <div>
                <label htmlFor="favoriteSubject" className="block text-sm font-medium text-gray-700 mb-2">
                  Favorite Subject
                </label>
                <select
                  id="favoriteSubject"
                  name="favoriteSubject"
                  value={formData.favoriteSubject}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select your favorite subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Economics">Economics</option>
                  <option value="Literature">Literature</option>
                  <option value="History">History</option>
                  <option value="Art">Art</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="areasOfInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Interest
                </label>
                <textarea
                  id="areasOfInterest"
                  name="areasOfInterest"
                  value={formData.areasOfInterest}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Describe your areas of interest (e.g., technology, medicine, business, arts)"
                />
              </div>

              <div>
                <label htmlFor="workPreference" className="block text-sm font-medium text-gray-700 mb-2">
                  Work Environment Preference
                </label>
                <select
                  id="workPreference"
                  name="workPreference"
                  value={formData.workPreference}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select your preference</option>
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Field Work">Field Work</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>

              <div>
                <label htmlFor="careerValues" className="block text-sm font-medium text-gray-700 mb-2">
                  Career Values
                </label>
                <textarea
                  id="careerValues"
                  name="careerValues"
                  value={formData.careerValues}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="What matters most to you in a career? (e.g., helping others, creativity, financial stability)"
                />
              </div>

              <div>
                <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Location
                </label>
                <input
                  type="text"
                  id="currentLocation"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your current city/state"
                />
              </div>

              <div>
                <label htmlFor="preferredStudyLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Study Location
                </label>
                <input
                  type="text"
                  id="preferredStudyLocation"
                  name="preferredStudyLocation"
                  value={formData.preferredStudyLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Where would you like to study?"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </div>
                  ) : (
                    'Get Career Recommendations'
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {!recommendations ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Discover Your Path?</h3>
                <p className="text-gray-600">
                  Fill out the assessment form to get personalized career recommendations tailored just for you.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Career Recommendations</h3>

                {/* Career Cards */}
                <div className="space-y-4 mb-6">
                  {recommendations.careers?.map((career, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{career.title}</h4>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {career.match}% Match
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-600 font-medium">{career.salary}</span>
                        <div className="flex flex-wrap gap-1">
                          {career.requirements?.slice(0, 2).map((req, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insights */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Personalized Insights</h4>
                  <ul className="space-y-2">
                    {recommendations.insights?.map((insight, index) => (
                      <li key={index} className="text-blue-800 text-sm flex items-start">
                        <svg className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
