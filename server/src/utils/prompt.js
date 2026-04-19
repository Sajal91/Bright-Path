export const getFinalPrompt = (payload) => {
    let {
        currentClass,
        percentage,
        favoriteSubject,
        areasOfInterest,
        workPreference,
        careerValues,
        currentLocation,
        preferredStudyLocation
    } = payload;

    return `You are an academic and career guidance assistant for students in India.

IMPORTANT INSTRUCTIONS:
- You MUST return ONLY valid JSON.
- DO NOT return arrays of strings for objects.
- Each item in "nearbyColleges" and "scholarshipAlerts" MUST be an object with ALL required fields.
- DO NOT skip any field.
- ALWAYS include valid-looking URLs starting with https://
- DO NOT explain anything. ONLY return JSON.

Inputs:
- Current Class: ${currentClass}
- Percentage / Aptitude Score: ${percentage}%
- Favorite Subject: ${favoriteSubject}
- Areas of Interest: ${areasOfInterest}
- Work Preference: ${workPreference}
- Career Values: ${careerValues}
- Current Location: ${currentLocation}
- Preferred Study Location: ${preferredStudyLocation}

Return EXACTLY in this format:

{
  "recommendedStreams": [
    {
      "stream": "string",
      "suggestedCourses": ["string"],
      "careerOptions": ["string"]
    }
  ],
  "nearbyColleges": [
    {
      "collegeName": "string",
      "collegeWebsiteLink": "https://example.com"
    }
  ],
  "scholarshipAlerts": [
    {
      "scholarshipName": "string",
      "scholarshipApplyLink": "https://example.com"
    }
  ]
}
`;
};