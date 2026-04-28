import mongoose from 'mongoose';

const nearbyCollegeSchema = new mongoose.Schema({
    collegeName: String,
    collegeWebsiteLink: String
}, { id: false });

const scholarshipAlertSchema = new mongoose.Schema({
    scholarshipName: String,
    scholarshipApplyLink: String
}, { id: false });

const generationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    recommendedStreams: [
        {
            stream: {
                type: String,
                required: true
            },
            suggestedCourses: {
                type: [String],  // Array of strings
                default: []
            },
            careerOptions: {
                type: [String],
                default: []
            }
        }
    ],

    nearbyColleges: [{
        type: nearbyCollegeSchema,
        default: []
    }],

    scholarshipAlerts: [{
        type: scholarshipAlertSchema,
        default: []
    }]
}, {
    timestamps: true
});

const Generation = mongoose.model("Generation", generationSchema);
export default Generation;