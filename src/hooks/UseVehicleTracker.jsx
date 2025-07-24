import { useEffect, useState } from "react";

export default function UseVehicleTracker() {
  const [trail, setTrail] = useState([[14.5995, 120.9842]]); // Start at Manila

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prevTrail) => {
        const [prevLat, prevLng] = prevTrail[prevTrail.length - 1];
        const newPos = [prevLat + 0.0001, prevLng + 0.0002];
        return [...prevTrail, newPos];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const position = trail[trail.length - 1]; // last known position

  return { position, trail }; //
}
