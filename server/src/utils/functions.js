import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


export async function generate() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an academic and career guidance assistant for students in India.  
Based on the following inputs, suggest suitable academic streams, courses, career paths, and nearby government colleges.

            Inputs:  
- Aptitude Score: 72 % (Strong in Maths, Accounts & Logical Reasoning)
        - Interests: Web Development, Problem Solving
    - Location: East Delhi, Delhi  

Output Format(strictly follow this JSON structure): {
        "recommended_streams": [
            {
                "stream": "Science (PCM)",
                "suggested_courses": ["B.Tech in Computer Science", "B.Sc in Data Science"],
                "career_options": ["Software Engineer", "Data Scientist"]
            },
            {
                "stream": "Commerce with Maths",
                "suggested_courses": ["B.Com (Hons)", "BBA"],
                "career_options": ["Financial Analyst", "Business Consultant"]
            }
        ],
        "nearby_colleges": [
            "Government Degree College, Lucknow",
            "King George's Government College, Lucknow",
            "Lucknow University - Government Affiliated Programs"
        ],
            "scholarship_alerts": [
                "UP Government Post-Matric Scholarship",
                "National Means-cum-Merit Scholarship"
            ]
    }`,
    });
    return response;
}

export const trimAndParseJson = (inputString) => {
    // Regular Expression to find the content starting with the first '{' 
    // and ending with the last '}'. The 's' flag ([\s\S]) is key to matching 
    // content across multiple lines, which is common with formatted JSON.
    const jsonRegex = /\{[\s\S]*\}/;

    // Attempt to match the JSON object within the string
    const match = inputString.match(jsonRegex);

    if (match && match[0]) {
        try {
            // match[0] contains the clean JSON string
            const cleanJsonString = match[0];

            // Use JSON.parse() to convert the clean string to an object
            const data = JSON.parse(cleanJsonString);
            return data;
        } catch (e) {
            // Handle JSON parsing errors if the structure inside the braces is invalid
            return `Error decoding JSON after trimming: ${e.message}`;
        }
    } else {
        return "Error: Could not find a complete JSON object (starting with '{' and ending with '}') in the input string.";
    }
}