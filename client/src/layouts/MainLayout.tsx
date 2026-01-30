import { type ReactNode } from 'react';
import { Sidebar } from '../components/Navigation/Sidebar';
import { TopBar } from '../components/Navigation/TopBar';
import { BottomNav } from '../components/Navigation/BottomNav'; // To be implemented
import './MainLayout.css';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="main-layout">
            <TopBar />
            <div className="layout-body">
                <Sidebar />
                <main className="content-area">
                    {children}
                </main>
            </div>
            <BottomNav />
        </div>
    );
};
