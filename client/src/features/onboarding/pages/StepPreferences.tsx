
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { Button } from '../../../components/Button/Button';
import { SelectableCard } from '../../../components/SelectableCard';
import { useOnboarding } from '../context/OnboardingContext';

const preferences = [
    'Keto', 'Vegan', 'Vegetarian', 'Paleo',
    'Gluten-Free', 'Dairy-Free', 'Low Carb', 'Mediterranean'
];

export const StepPreferences = () => {
    const { data, updateData, nextStep } = useOnboarding();

    const togglePreference = (pref: string) => {
        const current = data.dietaryPreferences;
        const updated = current.includes(pref)
            ? current.filter(p => p !== pref)
            : [...current, pref];
        updateData({ dietaryPreferences: updated });
    };

    return (
        <OnboardingLayout title="Any dietary preferences?" subtitle="Select all that apply.">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {preferences.map((pref) => (
                    <SelectableCard
                        key={pref}
                        label={pref}
                        selected={data.dietaryPreferences.includes(pref)}
                        onClick={() => togglePreference(pref)}
                    />
                ))}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Button onClick={nextStep} fullWidth size="lg">
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
};
