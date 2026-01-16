import React, { useState } from 'react';
import { Film, MapPin, Calendar, Clock, Star, ChevronRight } from 'lucide-react';
import Movie from './Components/Movie';


const BookMyShowUI = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentView, setCurrentView] = useState('home');

  const movies = [
    {
      id: 1,
      title: 'The Dark Symphony',
      genre: 'Action/Thriller',
      rating: 8.9,
      language: 'English',
      format: '2D, IMAX 3D',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop',
      votes: '245K'
    },
    {
      id: 2,
      title: 'Love in Paris',
      genre: 'Romance/Drama',
      rating: 8.2,
      language: 'English',
      format: '2D',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
      votes: '128K'
    },
    {
      id: 3,
      title: 'Cosmic Warriors',
      genre: 'Sci-Fi/Adventure',
      rating: 9.1,
      language: 'English',
      format: '2D, 3D, IMAX',
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
      votes: '567K'
    },
    {
      id: 4,
      title: 'Mystery Manor',
      genre: 'Horror/Mystery',
      rating: 7.8,
      language: 'English',
      format: '2D',
      image: 'https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=400&h=600&fit=crop',
      votes: '89K'
    }
  ];

  const theaters = [
    {
      id: 1,
      name: 'PVR Cinemas - Phoenix Mall',
      shows: ['10:30 AM', '1:45 PM', '5:00 PM', '8:15 PM', '11:30 PM']
    },
    {
      id: 2,
      name: 'INOX - R City Mall',
      shows: ['11:00 AM', '2:15 PM', '5:30 PM', '9:00 PM']
    },
    {
      id: 3,
      name: 'Cinepolis - Nexus Mall',
      shows: ['12:00 PM', '3:30 PM', '6:45 PM', '10:00 PM']
    }
  ];

  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const seats = [];
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const isBooked = Math.random() > 0.7;
        seats.push({
          id: seatId,
          row,
          number: i,
          price: row <= 'C' ? 250 : row <= 'F' ? 200 : 150,
          type: row <= 'C' ? 'Premium' : row <= 'F' ? 'Standard' : 'Economy',
          booked: isBooked
        });
      }
    });
    return seats;
  };

  const [seats] = useState(generateSeats());

  const handleSeatClick = (seat) => {
    if (seat.booked) return;
    
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id);
      if (exists) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);



  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended Movies</h2>
          <p className="text-gray-600">Book tickets for the latest releases</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Movie />
        </div>
      </div>
    </div>
  );

  const TheaterSelection = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => setCurrentView('home')}
            className="text-red-500 font-medium mb-2 hover:underline"
          >
            ← Back to Movies
          </button>
          <div className="flex items-start gap-4">
            <img src={selectedMovie.image} alt={selectedMovie.title} className="w-20 h-28 rounded object-cover" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedMovie.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-red-500 fill-red-500" />
                  {selectedMovie.rating}/10
                </span>
                <span>{selectedMovie.genre}</span>
                <span>{selectedMovie.language}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-gray-700">
          <Calendar size={20} />
          <span className="font-semibold">Today, 11 Dec 2025</span>
        </div>

        <div className="space-y-4">
          {theaters.map(theater => (
            <div key={theater.id} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{theater.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    Distance: 2.5 km
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {theater.shows.map((show, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedShow({ theater: theater.name, time: show });
                      setCurrentView('seats');
                    }}
                    className="px-6 py-3 border-2 border-green-500 text-green-600 rounded-md font-medium hover:bg-green-50 transition-colors"
                  >
                    {show}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SeatSelection = () => (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => setCurrentView('theaters')}
            className="text-red-400 font-medium mb-2 hover:underline"
          >
            ← Change Show
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{selectedMovie.title}</h1>
              <p className="text-sm text-gray-400 mt-1">
                {selectedShow.theater} | {selectedShow.time}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Selected Seats</p>
              <p className="text-2xl font-bold text-green-400">{selectedSeats.length}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-600 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-800 rounded"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-300 h-1 w-3/4 mx-auto mb-12 rounded"></div>
        <p className="text-center text-gray-400 text-sm mb-8">Screen this way</p>

        <div className="flex flex-col items-center gap-2 mb-8">
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-8 text-center font-semibold text-gray-400">{row}</span>
              <div className="flex gap-2">
                {seats.filter(s => s.row === row).map(seat => {
                  const isSelected = selectedSeats.find(s => s.id === seat.id);
                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.booked}
                      className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                        seat.booked
                          ? 'bg-gray-800 cursor-not-allowed'
                          : isSelected
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Selected Seats: {selectedSeats.map(s => s.id).join(', ')}
              </p>
              <p className="text-2xl font-bold mt-1">₹{totalPrice}</p>
            </div>
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 flex items-center gap-2">
              Proceed to Pay
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {currentView === 'home' && <HomePage />}
      {currentView === 'theaters' && <TheaterSelection />}
      {currentView === 'seats' && <SeatSelection />}
    </div>
  );
};

export default BookMyShowUI;