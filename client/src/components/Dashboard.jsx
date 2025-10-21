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
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("bright-path-auth-token")}`,
          }
        },
      );

      console.log(response.data)

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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Personalized Recommendations</h3>

                {/* Recommended Streams Section */}
                {recommendations.recommended_streams && recommendations.recommended_streams.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Recommended Academic Streams</h4>
                    </div>
                    <div className="space-y-4">
                      {recommendations.recommended_streams.map((stream, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
                          <div className="flex items-start justify-between mb-3">
                            <h5 className="text-lg font-semibold text-blue-900">{stream.stream}</h5>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Stream {index + 1}
                            </span>
                          </div>

                          {/* Suggested Courses */}
                          <div className="mb-4">
                            <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <svg className="h-4 w-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              Suggested Courses
                            </h6>
                            <div className="flex flex-wrap gap-2">
                              {stream.suggested_courses?.map((course, courseIndex) => (
                                <span key={courseIndex} className="bg-white text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Career Options */}
                          <div>
                            <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                              <svg className="h-4 w-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                              </svg>
                              Career Options
                            </h6>
                            <div className="flex flex-wrap gap-2">
                              {stream.career_options?.map((career, careerIndex) => (
                                <span key={careerIndex} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                                  {career}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nearby Colleges Section */}
                {recommendations.nearby_colleges && recommendations.nearby_colleges.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Nearby Colleges</h4>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
                      <div className="space-y-3">
                        {recommendations.nearby_colleges.map((college, index) => (
                          <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">{college}</h5>
                              <p className="text-sm text-gray-600">Government Institution</p>
                            </div>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Scholarship Alerts Section */}
                {recommendations.scholarship_alerts && recommendations.scholarship_alerts.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Scholarship Opportunities</h4>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
                      <div className="space-y-3">
                        {recommendations.scholarship_alerts.map((scholarship, index) => (
                          <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">{scholarship}</h5>
                              <p className="text-sm text-gray-600">Available Now</p>
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Apply Now
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105">
                    Save Recommendations
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                    Download PDF
                  </button>
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
