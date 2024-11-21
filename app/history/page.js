"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function History() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Fetch saved locations from the API
        const fetchLocations = async () => {
            const res = await fetch("/api/saved-locations");
            const data = await res.json();
            setLocations(data);
        };

        fetchLocations();
    }, []);

    return (
        <section className="p-6 container mx-auto min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8">History</h1>
            <div className="bg-white rounded-lg p-6 min-h-[80vh]">
                <h2 className="text-2xl font-bold mb-4">Saved Locations</h2>
                {locations.length > 0 ? (
                    <ul className="space-y-4">
                        {locations.map((location, index) => (
                            <li key={index} className="p-4 bg-gray-100 rounded-lg">
                                <p>
                                    <strong>Latitude:</strong> {location.lat}
                                </p>
                                <p>
                                    <strong>Longitude:</strong> {location.lng}
                                </p>
                                <p>
                                    <strong>Saved At:</strong> {new Date(location.timestamp).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No locations saved yet.</p>
                )}
            </div>
            <div className="mt-5">
                <Link href="/" className="btn lg:btn-wide btn-max btn-primary btn-outline">
                    Back to Home
                </Link>
            </div>
        </section>
    );
}
