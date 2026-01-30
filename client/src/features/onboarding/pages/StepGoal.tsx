
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { Button } from '../../../components/Button/Button';
import { useOnboarding } from '../context/OnboardingContext';

const goals = [
    { id: 'weight_loss', label: 'Weight Loss', icon: '⚖️' },
    { id: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { id: 'maintenance', label: 'Maintenance', icon: '🧘' },
    { id: 'healthy_eating', label: 'Eat Better', icon: '🥗' },
];

export const StepGoal = () => {
    const { data, updateData, nextStep } = useOnboarding();

    const handleSelect = (goal: string) => {
        updateData({ dietaryGoal: goal });
    };

    return (
        <OnboardingLayout title="What is your primary goal?" subtitle="We will curate recipes to help you achieve this.">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                {goals.map((goal) => (
                    <button
                        key={goal.id}
                        onClick={() => handleSelect(goal.id)}
                        style={{
                            padding: '24px',
                            border: `2px solid ${data.dietaryGoal === goal.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--border-radius-lg)',
                            backgroundColor: data.dietaryGoal === goal.id ? '#E8F5E9' : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span style={{ fontSize: '32px' }}>{goal.icon}</span>
                        <span style={{ fontWeight: 600 }}>{goal.label}</span>
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Button
                    disabled={!data.dietaryGoal}
                    onClick={nextStep}
                    fullWidth
                    size="lg"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
};
