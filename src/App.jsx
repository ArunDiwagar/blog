import React, { useState, useEffect } from 'react';
import './App.css'; // Importing the CSS file

const countriesBoundaries = [
  {
    country: "India",
    countryCode: "IN",
    latRange: {
      min: 8.7550,  // Southernmost point (Sri Lanka border)
      max: 37.0858, // Northernmost point (Jammu & Kashmir)
    },
    longRange: {
      min: 68.1766, // Westernmost point (Gujarat)
      max: 97.6167, // Easternmost point (Manipur)
    },
  },
  {
    country: "United States of America",
    countryCode: "US",
    latRange: {
      min: 24.3963,  // Southernmost point (Florida)
      max: 49.3843,  // Northernmost point (Maine)
    },
    longRange: {
      min: -125.0000, // Westernmost point (California)
      max: -66.9346,  // Easternmost point (Maine)
    }
  }
  
];


const BlogContent = () => {
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState("India"); // Default country
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const checkCountry = (latitude, longitude) => {
    for (let boundary of countriesBoundaries) {
      console.log("Checking country for:", latitude, longitude);  // Debugging line
      if (
        latitude >= boundary.latRange.min &&
        latitude <= boundary.latRange.max &&
        longitude >= boundary.longRange.min &&
        longitude <= boundary.longRange.max
      ) {
        console.log("Detected Country:", boundary.country);  // Debugging line
        return boundary.country;
      }
    }
    return "Unknown";
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);

          setLocation({ latitude, longitude });
          const detectedCountry = checkCountry(latitude, longitude);
          setCountry(detectedCountry !== "Unknown" ? detectedCountry : "India");
          setLoading(false);
          setPermissionGranted(true);
        },
        (error) => {
          console.log(error.message);
          setError("Geolocation permission denied. Defaulting to India.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported. Defaulting to India.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="loading">Loading your location...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1 className="heading">Blog</h1>
      <div className={`content ${country.toLowerCase().replace(/\s+/g, '-')}`}>
        <h2>Latest News from {country}</h2>
        {country === "India" ? (
          <p>India's tech industry is advancing in AI, blockchain, and 5G.</p>
        ) : country === "Central North America" ? (
          <p>North America leads in AI, cloud computing, and space exploration.</p>
        ) : (
          <p>Stay updated with global trends.</p>
        )}
        <p>Your current location: {country}</p>
      </div>
    </div>
  );
};

export default BlogContent;
