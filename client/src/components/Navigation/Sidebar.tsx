import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Heart, User, Calendar, ShoppingCart, Settings } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="sidebar">
            {/* User Greeting Area */}
            <div className="sidebar-user">
                <div className="user-avatar">
                    <User size={24} />
                </div>
                <div className="user-info">
                    <p className="greeting">Hi, Yusa 👋</p>
                    <p className="goal-status">KETO GOAL ACTIVE</p>
                </div>
            </div>

            {/* Main Navigation */}
            {/* Main Navigation */}
            <nav className="sidebar-nav">
                <NavLink to="/feed" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutGrid size={20} />
                    <span>Feed</span>
                </NavLink>
                <NavLink to="/favorites" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Heart size={20} />
                    <span>Favorites</span>
                </NavLink>
                <NavLink to="/meal-plan" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Calendar size={20} />
                    <span>Meal Plan</span>
                </NavLink>
                <NavLink to="/grocery-list" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <ShoppingCart size={20} />
                    <span>Grocery List</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button className="personalize-btn" onClick={() => navigate('/profile')}>
                    <Settings size={16} />
                    Personalize Feed
                </button>
            </div>
        </aside>
    );
};
