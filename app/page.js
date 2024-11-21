"use client";
import { useState, useEffect } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdDelete, MdSave } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6"
import Link from 'next/link';

export default function Home() {
  const [gpsData, setGpsData] = useState({ lat: 0, lng: 0 });
  const [videoUrl, setVideoUrl] = useState("http://your-esp32-cam-ip/stream");
  const [controlStatus, setControlStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch GPS location data
  useEffect(() => {
    const fetchGpsData = async () => {
      const res = await fetch("/api/gps"); // Backend API for GPS
      const data = await res.json();
      setGpsData(data);
    };

    fetchGpsData();
    const interval = setInterval(fetchGpsData, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Send control commands
  const sendControl = async (direction) => {
    setControlStatus(`Moving ${direction}`);
    await fetch("/api/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    setTimeout(() => setControlStatus(""), 1000);
  };

  // Save current location and take picture
  const saveLocation = async () => {
    await fetch("/api/save-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gpsData }),
    });
    alert("Location saved successfully!");
  };

  return (
    <section className="p-6 container mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">FloodScout</h1>

      {/* Page and modal button */}
      <div className="flex justify-between mx-auto px-2 mt-5">

        <Link href="/history" className="btn lg:btn-wide btn-max btn-primary text-white">
        <FaMapLocationDot />History
        </Link>
        <button
          className="btn lg:btn-wide btn-max btn-primary text-white"
          onClick={() => setIsModalOpen(true)} // Open modal
        >
          <FaMapLocationDot /> Live
        </button>
      </div>

      {/* Video stream */}
      <div className="mt-5">
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Live Video Stream</h2>
          <video
            src={videoUrl}
            className="rounded-lg w-full lg:max-h-[600px]"
            controls
            autoPlay
            muted
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="w-full px-2 mt-5">
        <button
          className="btn w-full btn-primary text-white"
          onClick={saveLocation}
        >
          <MdSave /> Human Found
        </button>
      </div>

      {/* Boat Controls */}
      <div className="bg-white rounded-lg p-6 mt-8 text-center text-white ">
        <h2 className="text-2xl font-bold mb-4">Boat Controls</h2>
        <div className="grid grid-cols-3 gap-4 mx-auto text-center">
          <div>
            <button className=" text-white btn lg:btn-wide btn-max btn-primary" onClick={() => sendControl("up")}>
              <FaAngleDoubleUp />
            </button>
          </div>
          <div>
            <button className=" text-white btn lg:btn-wide btn-max btn-primary" onClick={() => sendControl("left")}>
              <FaAngleDoubleLeft />
            </button>
          </div>
          <div>
            <button className=" text-white btn lg:btn-wide btn-max btn-primary" onClick={() => sendControl("right")}>
              <FaAngleDoubleRight />
            </button>
          </div>
          <div>
            <button className=" text-white btn lg:btn-wide btn-max btn-primary" onClick={() => sendControl("down")}>
              <FaAngleDoubleDown />
            </button>
          </div>
          <div>
            <button className=" text-white btn lg:btn-wide btn-max btn-primary" onClick={() => sendControl("slow")}>
              <FaAngleDown />
            </button>
          </div>
          <div>
            <button className=" text-white btn lg:btn-wide btn-max btn-primary" onClick={() => sendControl("fast")}>
              <FaAngleUp />
            </button>
          </div>
        </div>
        <p className="mt-4 text-green-500">{controlStatus}</p>
      </div>

      {/* Modal for Live Location */}
      {isModalOpen && (
        <div className="fixed px-5 lg:px-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg  w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Live Location</h2>
            <p>Latitude: {gpsData.lat}</p>
            <p>Longitude: {gpsData.lng}</p>
            <iframe
              src={`https://maps.google.com/maps?q=${gpsData.lat},${gpsData.lng}&z=15&output=embed`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <button
              className="btn btn-primary mt-4"
              onClick={() => setIsModalOpen(false)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
