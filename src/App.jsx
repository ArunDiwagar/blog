import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "e9042f29099cb8"; 

const blogContent = {
  India: {
    title: "Latest Trends in Indian Technology",
    content: "India's tech industry is rapidly growing with advancements in AI, Blockchain, and 5G."
  },
  "North America": {
    title: "Tech Innovations in North America",
    content: "North America leads in AI, Cloud Computing, and Quantum Computing."
  }
};

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    axios.get(`https://ipinfo.io/json?token=${API_KEY}`)
      .then(response => {
        console.log("API Response:", response.data); 
        const country = response.data.country; 
        if (country) {
          setLocation(country === "IN" ? "India" : "North America");
        } else {
          setLocation("India"); 
          setError("Could not detect country. Using default content.");
        }
      })
      .catch(error => {
        console.error("Error fetching location", error);
        setError("Failed to fetch location. Using default content.");
        setLocation("India");
      });
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {location ? (
        <div className="blog">
          <h1>{blogContent[location].title}</h1>
          <p>{blogContent[location].content}</p>
        </div>
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
}

export default App;
