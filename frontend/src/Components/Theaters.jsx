import React from "react";
import fetchTheaterData from "../assets/Data/TheaterData";

const Theaters = () => {
  const [theaters, setTheaters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const getTheaters = async () => {
            try {
                const data = await fetchTheaterData();
                console.log('Fetched theater data:', data);
                setTheaters(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        getTheaters();
    }, []);

    if (loading) {
        return <div className="loading">Loading theaters...</div>;
    }
    if (error) {
        return <div className="error">Error: {error}</div>;
    }
    return (
        <>
            {theaters.map((theater) => (
                <div key={theater.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">{theater.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{theater.location}</p>
                    <p className="text-gray-600 text-sm">Number of Screens: {theater.screens}</p>
                </div>
            ))}
        </>
    );
}

export default Theaters;
