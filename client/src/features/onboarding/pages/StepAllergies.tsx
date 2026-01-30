
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { Button } from '../../../components/Button/Button';
import { SelectableCard } from '../../../components/SelectableCard';
import { useOnboarding } from '../context/OnboardingContext';

const allergens = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Eggs',
    'Wheat', 'Soy', 'Fish', 'Shellfish'
];

export const StepAllergies = () => {
    const { data, updateData, nextStep } = useOnboarding();

    const toggleAllergy = (item: string) => {
        const current = data.allergies;
        const updated = current.includes(item)
            ? current.filter(i => i !== item)
            : [...current, item];
        updateData({ allergies: updated });
    };

    return (
        <OnboardingLayout title="Any allergies?" subtitle="We will exclude recipes containing these ingredients.">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {allergens.map((item) => (
                    <SelectableCard
                        key={item}
                        label={item}
                        selected={data.allergies.includes(item)}
                        onClick={() => toggleAllergy(item)}
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
