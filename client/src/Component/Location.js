import React, { useState, useEffect } from "react";

const Location = () => {
  const OPENCAGE_API_KEY = "74df35ab5a34481da6160b38488ce3af";

  const [location, setLocation] = useState(null);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLocation({ latitude, longitude, accuracy });

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            );
            const data = await response.json();

            if (data?.results?.length > 0) {
              const components = data.results[0].components;
              setPlaceInfo({
                city: components.city || components.town || components.village,
                region: components.state,
                country: components.country,
              });
            } else {
              setError("Could not retrieve location details.");
            }
          } catch (err) {
            setError("Failed to fetch reverse geolocation.");
          }
        },
        () => {
          setError("Permission denied or location unavailable");
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy} meters</p>
        </>
      )}
      {placeInfo && (
        <p>{placeInfo.city}, {placeInfo.region}, {placeInfo.country}</p>
      )}
      {!location && !error && <p>Getting location...</p>}
    </div>
  );
};

export default Location;
