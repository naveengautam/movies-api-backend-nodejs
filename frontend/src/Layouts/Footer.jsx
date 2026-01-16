import React, { PureComponent } from 'react'
import { Star } from 'lucide-react';
function Footer({ year }) {
    return (
      <>
        <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold">EventHub</span>
                </div>
                <p className="text-slate-400 text-sm">
                    Your one-stop destination for all entertainment bookings
                </p>
                </div>
                <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                    <li><a href="#" className="hover:text-purple-400">About Us</a></li>
                    <li><a href="#" className="hover:text-purple-400">Contact</a></li>
                    <li><a href="#" className="hover:text-purple-400">Careers</a></li>
                </ul>
                </div>
                <div>
                <h4 className="font-bold mb-4">Categories</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                    <li><a href="#" className="hover:text-purple-400">Movies</a></li>
                    <li><a href="#" className="hover:text-purple-400">Concerts</a></li>
                    <li><a href="#" className="hover:text-purple-400">Theater</a></li>
                </ul>
                </div>
                <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                    <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                    <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                </ul>
                </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400 text-sm">
                © {year} EventHub. All rights reserved.
            </div>
            </div>
        </footer>
      </>
    )
  }

export default Footer