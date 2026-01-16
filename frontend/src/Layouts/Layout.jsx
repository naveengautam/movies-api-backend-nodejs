import { Outlet, Link, NavLink} from "react-router-dom";
import { Star } from 'lucide-react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


export default function Layout() {
    const currentYear = new Date().getFullYear();
    return (
        <>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
            <Header />
            <Outlet />
            <Footer year={currentYear} />
        </div>
    </>
    )
}

