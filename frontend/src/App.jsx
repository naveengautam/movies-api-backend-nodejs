import React, { useState } from 'react';
import { Search, Film, Music, Theater, Calendar, MapPin, Star, TrendingUp, Clock } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events', icon: Star },
    { id: 'movies', name: 'Movies', icon: Film },
    { id: 'concerts', name: 'Concerts', icon: Music },
    { id: 'theater', name: 'Theater', icon: Theater }
  ];

  const featuredEvents = [
    { id: 1, title: 'The Grand Symphony', type: 'Concert', date: 'Jan 20, 2026', venue: 'Royal Concert Hall', price: '$45', rating: 4.8, image: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 2, title: 'Midnight Dreams', type: 'Movie', date: 'Now Showing', venue: 'Cinema Complex', price: '$12', rating: 4.5, image: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 3, title: 'Shakespeare Reimagined', type: 'Theater', date: 'Jan 25, 2026', venue: 'Downtown Theater', price: '$38', rating: 4.9, image: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { id: 4, title: 'Rock Legends Live', type: 'Concert', date: 'Feb 1, 2026', venue: 'Arena Stadium', price: '$89', rating: 4.7, image: 'bg-gradient-to-br from-red-500 to-rose-500' }
  ];

  const stats = [
    { label: 'Events Listed', value: '10,000+', icon: Calendar },
    { label: 'Happy Customers', value: '500K+', icon: Star },
    { label: 'Cities Covered', value: '150+', icon: MapPin },
    { label: 'Years Running', value: '8+', icon: Clock }
  ];

  return (
    <>
            {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          Your Entertainment,
          <br />
          One Click Away
        </h1>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Book tickets for movies, concerts, theater shows, and more. 
          Experience the best entertainment events in your city.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for movies, concerts, shows, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-slate-400 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                    : 'bg-slate-800/50 border border-slate-700 hover:border-purple-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:border-purple-500 transition-all">
                <Icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl font-bold">Featured Events</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all hover:shadow-xl hover:shadow-purple-500/20 group cursor-pointer"
            >
              <div className={`h-48 ${event.image} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <div className="text-white text-6xl opacity-20">🎭</div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{event.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  {event.venue}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">{event.price}</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose EventHub?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Best Selection</h3>
            <p className="text-slate-400">
              Access to thousands of events across movies, concerts, theater, and more
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
            <p className="text-slate-400">
              Book your tickets instantly and get confirmation in seconds
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Multiple Venues</h3>
            <p className="text-slate-400">
              Find events at venues across 150+ cities worldwide
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default App