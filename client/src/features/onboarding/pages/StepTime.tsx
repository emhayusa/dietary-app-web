
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { Button } from '../../../components/Button/Button';
import { useOnboarding } from '../context/OnboardingContext';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';

const timeOptions = [
    { id: '15', label: 'Under 15 mins' },
    { id: '30', label: '15-30 mins' },
    { id: '45', label: '30-45 mins' },
    { id: '60', label: '45+ mins' },
];

export const StepTime = () => {
    const { data, updateData } = useOnboarding();
    const navigate = useNavigate();

    const { showToast } = useToast();

    const handleSelect = (time: string) => {
        updateData({ cookingTime: time });
    };

    const handleFinish = async () => {
        try {
            await api.saveProfile(data);
            localStorage.setItem('hasProfile', 'true'); // Simple auth state for now
            showToast('Welcome to NutriRecipe! Profile created.', 'success');
            navigate('/feed');
        } catch (error) {
            console.error("Failed to save", error);
            alert("Failed to save profile. Please see console.");
        }
    };

    return (
        <OnboardingLayout title="Cooking time preference" subtitle="How much time do you have per meal?">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {timeOptions.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        style={{
                            padding: '20px',
                            border: `2px solid ${data.cookingTime === option.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--border-radius-md)',
                            backgroundColor: data.cookingTime === option.id ? '#E8F5E9' : 'white',
                            textAlign: 'left',
                            fontSize: '18px',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Button
                    disabled={!data.cookingTime}
                    onClick={handleFinish}
                    fullWidth
                    size="lg"
                >
                    Complete Setup
                </Button>
            </div>
        </OnboardingLayout>
    );
};
