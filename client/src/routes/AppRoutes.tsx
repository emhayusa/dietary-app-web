
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OnboardingFlow from '../features/onboarding/OnboardingFlow';
import { MainLayout } from '../layouts/MainLayout';

import { Feed } from '../features/feed/pages/Feed';
import { RecipeDetail } from '../features/feed/pages/RecipeDetail';
import { FavoritesPage } from '../features/feed/pages/FavoritesPage';
import { MealPlannerPage } from '../features/planning/pages/MealPlannerPage';
import { PlannerProvider } from '../features/planning/context/PlannerContext';
import { GroceryPage } from '../features/shopping/pages/GroceryPage';
import { ProfilePage } from '../features/profile/pages/ProfilePage';

const AppRoutes = () => {
    const hasProfile = Boolean(localStorage.getItem('hasProfile'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={hasProfile ? "/feed" : "/onboarding"} replace />} />
                <Route path="/onboarding/*" element={<OnboardingFlow />} />
                <Route path="/feed" element={<MainLayout><Feed /></MainLayout>} />
                <Route path="/recipe/:id" element={<MainLayout><RecipeDetail /></MainLayout>} />
                <Route path="/favorites" element={<MainLayout><FavoritesPage /></MainLayout>} />
                <Route path="/meal-plan" element={
                    <PlannerProvider>
                        <MainLayout><MealPlannerPage /></MainLayout>
                    </PlannerProvider>
                } />
                <Route path="/grocery-list" element={<MainLayout><GroceryPage /></MainLayout>} />
                <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
