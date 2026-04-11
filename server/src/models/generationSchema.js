import mongoose from 'mongoose';

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

    nearbyColleges: {
        type: [String],
        default: []
    },

    scholarshipAlerts: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const Generation = mongoose.model("Generation", generationSchema);
export default Generation;