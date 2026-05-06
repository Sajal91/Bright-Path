import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setFlashMessage } from '../redux/slices/flashMessageSlice.js';

const Dashboard = () => {
  const dispatch = useDispatch();
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
  const [previousGenerations, setPreviousGenerations] = useState([]);
  const [isLoadingGenerations, setIsLoadingGenerations] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form', 'results', 'history'
  const [selectedGeneration, setSelectedGeneration] = useState(null);

  // Fetch previous generations on component mount
  useEffect(() => {
    fetchPreviousGenerations();
  }, []);

  const fetchPreviousGenerations = async () => {
    setIsLoadingGenerations(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CLIENT_URL}/user/generations`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("bright-path-auth-token")}`,
          }
        }
      );
      setPreviousGenerations(response.data.generations || []);
    } catch (err) {
      console.error("Error fetching generations:", err);
    } finally {
      setIsLoadingGenerations(false);
    }
  };

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
      dispatch(setFlashMessage({ success: true, message: 'Career recommendations generated successfully' }));
      // Refresh the generations list after successful generation
      fetchPreviousGenerations();
    } catch (err) {
      console.error("Error:", err);
      const backendError =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "An unexpected error occurred while generating recommendations.";
      dispatch(setFlashMessage({ success: false, message: backendError }));
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-xl animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Career Journey!</h2>
          <p className="text-blue-100">
            Fill out the form below to get personalized career recommendations based on your interests, skills, and preferences.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('form')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'form'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  New Assessment
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Previous Results ({previousGenerations.length})
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'form' && (
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
                {recommendations.nearbyColleges && recommendations.nearbyColleges.length > 0 && (
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
                        {recommendations.nearbyColleges.map((college, index) => (
                          <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">{college.collegeName}</h5>
                              <p className="text-sm text-gray-600">Government Institution</p>
                            </div>
                            <NavLink className="text-green-600 hover:text-green-700 text-sm font-medium" to={college.collegeWebsiteLink}>
                              View Details
                            </NavLink>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Scholarship Alerts Section */}
                {recommendations.scholarshipAlerts && recommendations.scholarshipAlerts.length > 0 && (
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
                        {recommendations.scholarshipAlerts.map((scholarship, index) => (
                          <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">{scholarship.scholarshipName}</h5>
                              <p className="text-sm text-gray-600">Available Now</p>
                            </div>
                            <NavLink className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full" to={scholarship.scholarshipApplyLink}>
                              Apply Now
                            </NavLink>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        )}

        {/* History Tab Content */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Your Previous Career Assessments</h3>
                <button
                  onClick={fetchPreviousGenerations}
                  disabled={isLoadingGenerations}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {isLoadingGenerations ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  Refresh
                </button>
              </div>

              {isLoadingGenerations ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600">Loading your previous assessments...</p>
                </div>
              ) : previousGenerations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Previous Assessments Found</h3>
                  <p className="text-gray-600 mb-4">
                    You haven't completed any career assessments yet. Start your first assessment to see your results here.
                  </p>
                  <button
                    onClick={() => setActiveTab('form')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start New Assessment
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {previousGenerations.map((generation, index) => (
                    <div key={generation._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            Assessment #{previousGenerations.length - index}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Completed on {new Date(generation.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {generation.recommendedStreams?.length || 0} Streams
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {generation.nearbyColleges?.length || 0} Colleges
                          </span>
                        </div>
                      </div>

                      {/* Recommended Streams Preview */}
                      {generation.recommendedStreams && generation.recommendedStreams.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Recommended Streams:</h5>
                          <div className="flex flex-wrap gap-2">
                            {generation.recommendedStreams.slice(0, 3).map((stream, streamIndex) => (
                              <span key={streamIndex} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                {stream.stream}
                              </span>
                            ))}
                            {generation.recommendedStreams.length > 3 && (
                              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                                +{generation.recommendedStreams.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Nearby Colleges Preview */}
                      {generation.nearbyColleges && generation.nearbyColleges.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Nearby Colleges:</h5>
                          <div className="flex flex-wrap gap-2">
                            {generation.nearbyColleges.slice(0, 3).map((college, collegeIndex) => (
                              <span key={collegeIndex} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                                {college.collegeName}
                              </span>
                            ))}
                            {generation.nearbyColleges.length > 3 && (
                              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                                +{generation.nearbyColleges.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedGeneration(selectedGeneration === generation._id ? null : generation._id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                      >
                        {selectedGeneration === generation._id ? 'Hide Full Results' : 'View Full Results'}
                      </button>

                      {/* Full Results Display */}
                      {selectedGeneration === generation._id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h5 className="text-lg font-semibold text-gray-900 mb-4">Complete Assessment Results</h5>
                          
                          {/* Recommended Streams Section */}
                          {generation.recommendedStreams && generation.recommendedStreams.length > 0 && (
                            <div className="mb-8">
                              <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </div>
                                <h6 className="text-lg font-semibold text-gray-900">Recommended Academic Streams</h6>
                              </div>
                              <div className="space-y-4">
                                {generation.recommendedStreams.map((stream, streamIndex) => (
                                  <div key={streamIndex} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
                                    <div className="flex items-start justify-between mb-3">
                                      <h7 className="text-lg font-semibold text-blue-900">{stream.stream}</h7>
                                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        Stream {streamIndex + 1}
                                      </span>
                                    </div>

                                    {/* Suggested Courses */}
                                    <div className="mb-4">
                                      <h8 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <svg className="h-4 w-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Suggested Courses
                                      </h8>
                                      <div className="flex flex-wrap gap-2">
                                        {stream.suggestedCourses?.map((course, courseIndex) => (
                                          <span key={courseIndex} className="bg-white text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200">
                                            {course}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Career Options */}
                                    <div>
                                      <h8 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <svg className="h-4 w-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                        </svg>
                                        Career Options
                                      </h8>
                                      <div className="flex flex-wrap gap-2">
                                        {stream.careerOptions?.map((career, careerIndex) => (
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
                          {generation.nearbyColleges && generation.nearbyColleges.length > 0 && (
                            <div className="mb-8">
                              <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                </div>
                                <h6 className="text-lg font-semibold text-gray-900">Nearby Colleges</h6>
                              </div>
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
                                <div className="space-y-3">
                                  {generation.nearbyColleges.map((college, collegeIndex) => (
                                    <div key={collegeIndex} className="flex items-center p-3 bg-white rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                      </div>
                                      <div className="flex-1">
                                        <h7 className="font-medium text-gray-900">{college.collegeName}</h7>
                                        <p className="text-sm text-gray-600">Government Institution</p>
                                      </div>
                                      <NavLink className="text-green-600 hover:text-green-700 text-sm font-medium" to={college.collegeWebsiteLink}>
                                        View Details
                                      </NavLink>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Scholarship Alerts Section */}
                          {generation.scholarshipAlerts && generation.scholarshipAlerts.length > 0 && (
                            <div className="mb-8">
                              <div className="flex items-center mb-4">
                                <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                </div>
                                <h6 className="text-lg font-semibold text-gray-900">Scholarship Opportunities</h6>
                              </div>
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
                                <div className="space-y-3">
                                  {generation.scholarshipAlerts.map((scholarship, scholarshipIndex) => (
                                    <div key={scholarshipIndex} className="flex items-center p-3 bg-white rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                      </div>
                                      <div className="flex-1">
                                        <h7 className="font-medium text-gray-900">{scholarship.scholarshipName}</h7>
                                        <p className="text-sm text-gray-600">Available Now</p>
                                      </div>
                                      <NavLink className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full" to={scholarship.scholarshipApplyLink}>
                                        Apply Now
                                      </NavLink>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
