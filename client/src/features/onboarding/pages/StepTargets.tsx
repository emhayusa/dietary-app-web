import React from 'react';
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { useOnboarding } from '../context/OnboardingContext';

export const StepTargets = () => {
    const { data, updateData, nextStep } = useOnboarding();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateData({
            dailyTargets: {
                ...data.dailyTargets,
                [name]: parseInt(value) || 0
            }
        });
    };

    return (
        <OnboardingLayout title="Set your daily targets" subtitle="Customize your nutrition goals.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <Input
                    label="Daily Calories"
                    name="calories"
                    type="number"
                    value={data.dailyTargets.calories}
                    onChange={handleChange}
                />
                <Input
                    label="Protein (g)"
                    name="protein"
                    type="number"
                    value={data.dailyTargets.protein}
                    onChange={handleChange}
                />
                <Input
                    label="Carbs (g)"
                    name="carbs"
                    type="number"
                    value={data.dailyTargets.carbs}
                    onChange={handleChange}
                />
                <Input
                    label="Fats (g)"
                    name="fats"
                    type="number"
                    value={data.dailyTargets.fats}
                    onChange={handleChange}
                />
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Button onClick={nextStep} fullWidth size="lg">
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
};
