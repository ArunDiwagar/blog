import React, { useState, useEffect } from 'react';
import './App.css'; // Importing the CSS file

// Country boundaries data
const countriesBoundaries = [
  {
    country: "India",
    countryCode: "IN",
    latRange: {
      min: 6.4627,
      max: 37.6,
    },
    longRange: {
      min: 68.1766,
      max: 97.4026,
    },
  },
  {
    country: "United States of America",
    countryCode: "US",
    latRange: {
      min: 18.7763,
      max: 71.5380,
    },
    longRange: {
      min: -125.0,
      max: -66.9346,
    },
  },
];

const BlogContent = () => {
  const [location, setLocation] = useState(null);  // User's latitude and longitude
  const [country, setCountry] = useState("India");  // Default to India
  const [error, setError] = useState(null);        // Error messages
  const [loading, setLoading] = useState(true);    // Loading state
  const [permissionGranted, setPermissionGranted] = useState(false); // For permission check

  // Function to check if the user's location falls within the country boundaries
  const checkCountry = (latitude, longitude) => {
    for (let country of countriesBoundaries) {
      if (
        latitude >= country.latRange.min &&
        latitude <= country.latRange.max &&
        longitude >= country.longRange.min &&
        longitude <= country.longRange.max
      ) {
        return country.country; // Return the country name if within bounds
      }
    }
    return "India"; // Default to India if no match is found
  };

  // Get the user's location when the component is mounted
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude); // Log for debugging

          // Set location details
          setLocation({ latitude, longitude });

          // Check the user's country based on coordinates
          const detectedCountry = checkCountry(latitude, longitude);
          setCountry(detectedCountry);
          setLoading(false);
          setPermissionGranted(true);
        },
        (error) => {
          // Handle errors if geolocation is not granted or another error occurs
          console.log(error.message);
          setError("Geolocation permission denied or unavailable. Defaulting to India.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser. Defaulting to India.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="loading">Loading your location...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const renderContent = () => {
    if (country === "India") {
      return (
        <div className="content india">
          <h2>Latest News from India</h2>
          <p>India's technology sector is booming with advancements in AI, blockchain, and 5G. Stay updated with the latest trends.</p>
        </div>
      );
    } else if (country === "United States of America") {
      return (
        <div className="content usa">
          <h2>Latest News from the USA</h2>
          <p>The USA continues to lead in technology, finance, and healthcare. Read about the most recent developments in these fields.</p>
        </div>
      );
    } else {
      return (
        <div className="content global">
          <h2>Global News</h2>
          <p>Stay tuned for global news updates.</p>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Blog</h1>
      {permissionGranted ? (
        <div className="content-container">
          {renderContent()}
          <p>Your current location is in: {country}</p>
        </div>
      ) : (
        <p>Please allow location access for a better experience.</p>
      )}
    </div>
  );
};

export default BlogContent;
