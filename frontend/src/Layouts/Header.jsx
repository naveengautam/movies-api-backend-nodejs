import { Outlet, Link, NavLink} from "react-router-dom";
import { Star } from 'lucide-react';
import Signin from "../Components/Signin.jsx";
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Header() {   
    const { isLoggedIn, logout } = useContext(UserContext);
    const [currentView, setCurrentView] = React.useState('');

    function toggelSignin() {
        if (currentView === 'signin') {
            setCurrentView('');
        } else {
            setCurrentView('signin');
        }
    }
    //if user press esc button then sign in popup should close automatically
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setCurrentView('');
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [currentView]);

    function LogoutHandler() {
        // Call the logout function from context
        logout();
    }


    return (
    <>
        <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    EventHub
                    </span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <NavLink
                        to="/"
                        className={ ({isActive}) =>
                            `hover:text-purple-400 transition-colors ${isActive ? "text-orange-700" : ""}`
                        }
                    >Home</NavLink>
                    <a href="#" className="hover:text-purple-400 transition-colors">Events</a>
                    <NavLink
                        to="/bookmyshow"
                            className={({isActive}) =>
                                `hover:text-purple-400 transition-colors ${isActive ? "text-orange-700" : ""}`
                            }
                        >
                            Movies
                        </NavLink>
                    <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
                </nav>
                <div>
                    {isLoggedIn ? (
                        <button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            onClick={LogoutHandler}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            onClick={toggelSignin}
                        >
                            Sign In
                        </button>
                    )}
                </div>
                </div>
            </header>
        {currentView === 'signin' ? <Signin setCurrentView={setCurrentView} /> : <Outlet />}
    </>
    )
}



           