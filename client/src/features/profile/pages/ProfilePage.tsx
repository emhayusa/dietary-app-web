import { useState, useEffect } from 'react';
import { useToast } from '../../../context/ToastContext';
import { api } from '../../../services/api';
import { ProfileHeader } from '../components/ProfileHeader';
import { StatsSection } from '../components/StatsSection';
import { PreferencesSection } from '../components/PreferencesSection';
import { TargetsSection } from '../components/TargetsSection';
import { Button } from '../../../components/Button/Button';
import './ProfilePage.css';

export const ProfilePage = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await api.getProfile();
                if (data) {
                    setProfile({
                        ...data,
                        dietaryPreferences: data.dietaryPreferences || [],
                        allergies: data.allergies || [],
                        dailyTargets: data.dailyTargets || { calories: 2000, protein: 150, carbs: 200, fats: 70 }
                    });
                }
            } catch (err) {
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleChange = (field: string, value: any) => {
        setProfile((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleTargetChange = (field: string, value: number) => {
        setProfile((prev: any) => ({
            ...prev,
            dailyTargets: {
                ...prev.dailyTargets,
                [field]: value
            }
        }));
    };

    const handlePreferenceToggle = (pref: string) => {
        setProfile((prev: any) => {
            const current = prev.dietaryPreferences || [];
            if (current.includes(pref)) {
                return { ...prev, dietaryPreferences: current.filter((p: string) => p !== pref) };
            } else {
                return { ...prev, dietaryPreferences: [...current, pref] };
            }
        });
    };

    const handleAllergyToggle = (allergy: string) => {
        setProfile((prev: any) => {
            const current = prev.allergies || [];
            if (current.includes(allergy)) {
                return { ...prev, allergies: current.filter((a: string) => a !== allergy) };
            } else {
                return { ...prev, allergies: [...current, allergy] };
            }
        });
    };

    const { showToast } = useToast();

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.saveProfile(profile);
            showToast('Profile saved successfully!', 'success');
        } catch (err) {
            setError('Failed to save profile');
            showToast('Failed to save profile', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="profile-loading">Loading profile...</div>;
    if (!profile) return <div className="profile-error">Profile not found. Please complete onboarding.</div>;

    const goalLabel = profile.dietaryGoal ? profile.dietaryGoal.replace('_', ' ').toUpperCase() : 'NO GOAL';

    return (
        <div className="profile-page">
            <ProfileHeader
                name={profile.name || "User"}
                goal={goalLabel}
            />

            <StatsSection
                weight={profile.weight}
                height={profile.height}
                age={profile.age}
                activityLevel={profile.activityLevel}
                onChange={handleChange}
            />

            <TargetsSection
                targets={profile.dailyTargets}
                onChange={handleTargetChange}
            />

            <PreferencesSection
                dietaryGoal={profile.dietaryGoal}
                dietaryPreferences={profile.dietaryPreferences}
                cookingTime={profile.cookingTime}
                allergies={profile.allergies}
                onGoalChange={(goal) => handleChange('dietaryGoal', goal)}
                onPreferenceToggle={handlePreferenceToggle}
                onTimeChange={(time) => handleChange('cookingTime', time)}
                onAllergyToggle={handleAllergyToggle}
            />

            <div className="profile-footer">
                <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};
