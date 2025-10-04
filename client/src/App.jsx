import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [formPayload, setFormPayload] = useState({
    currentClass: "",
    percentage: "",
    favoriteSubject: "",
    areasOfInterest: "",
    workPreference: "",
    careerValues: "",
    currentLocation: "",
    preferredStudyLocation: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formPayload);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CLIENT_URL}/generate`,
        formPayload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form className="p-4">
      <label htmlFor="currentClass">Current Class</label>
      <input
        type="text"
        id="currentClass"
        value={formPayload.currentClass}
        onChange={(e) =>
          setFormPayload({ ...formPayload, currentClass: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <label htmlFor="percentage">Percentage</label>
      <input
        type="number"
        id="percentage"
        value={formPayload.percentage}
        onChange={(e) =>
          setFormPayload({ ...formPayload, percentage: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <label htmlFor="favoriteSubject">Favorite Subject</label>
      <input
        type="text"
        id="favoriteSubject"
        value={formPayload.favoriteSubject}
        onChange={(e) =>
          setFormPayload({ ...formPayload, favoriteSubject: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <label htmlFor="areasOfInterest">Areas Of Interest</label>
      <input
        type="text"
        id="areasOfInterest"
        value={formPayload.areasOfInterest}
        onChange={(e) =>
          setFormPayload({ ...formPayload, areasOfInterest: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <label htmlFor="careerValues">Career Values</label>
      <input
        type="text"
        id="careerValues"
        value={formPayload.careerValues}
        onChange={(e) =>
          setFormPayload({ ...formPayload, careerValues: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <label htmlFor="workPreference">Work Preference</label>
      <input
        type="text"
        id="workPreference"
        value={formPayload.workPreference}
        onChange={(e) =>
          setFormPayload({ ...formPayload, workPreference: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <label htmlFor="currentLocation">Current Location</label>
      <input
        type="text"
        id="currentLocation"
        value={formPayload.currentLocation}
        onChange={(e) =>
          setFormPayload({ ...formPayload, currentLocation: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <label htmlFor="preferredStudyLocation">Preferred Study Location</label>
      <input
        type="text"
        id="preferredStudyLocation"
        value={formPayload.preferredStudyLocation}
        onChange={(e) =>
          setFormPayload({ ...formPayload, preferredStudyLocation: e.target.value })
        }
        required
        className="border p-2 rounded w-full mt-2"
      />

      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
}

export default App;