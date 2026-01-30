import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Bell, Settings } from 'lucide-react';
import './TopBar.css';


export const TopBar = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (query) {
            newParams.set('search', query);
        } else {
            newParams.delete('search');
        }
        setSearchParams(newParams);
        // Ensure we are on the feed page when searching
        if (window.location.pathname !== '/feed') {
            navigate(`/feed?${newParams.toString()}`);
        }
    };

    return (
        <header className="topbar">
            {/* Logo Area */}
            <div className="logo-area">
                <div className="logo-icon">🥗</div>
                <span className="logo-text">NutriRecipe</span>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search healthy recipes..."
                    onChange={handleSearch}
                    value={searchParams.get('search') || ''}
                />
            </div>

            {/* Right Actions */}
            <div className="topbar-actions">
                <nav className="top-nav-links">
                    <a href="#">Discover</a>
                    <a href="#">Community</a>
                    <a href="#">Plan</a>
                </nav>
                <div className="icon-actions">
                    <button className="icon-btn">
                        <Bell size={20} />
                        <span className="badge-dot"></span>
                    </button>
                    <button className="icon-btn" onClick={() => navigate('/profile')}>
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};
