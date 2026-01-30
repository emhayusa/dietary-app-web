import { NavLink } from 'react-router-dom';
import { Heart, User, Calendar, Home, ShoppingCart } from 'lucide-react';
import './BottomNav.css';

export const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            <NavLink to="/feed" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <Home size={24} />
                <span>Feed</span>
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <Heart size={24} />
                <span>Saved</span>
            </NavLink>
            <NavLink to="/meal-plan" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <Calendar size={24} />
                <span>Plan</span>
            </NavLink>
            <NavLink to="/grocery-list" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <ShoppingCart size={24} />
                <span>Shop</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <User size={24} />
                <span>Me</span>
            </NavLink>
        </nav>
    )
}
