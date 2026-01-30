
import { Button } from '../../../components/Button/Button';
import { useOnboarding } from '../context/OnboardingContext';
import '../../../components/Button/Button.css'; // Just in case relevant styles are needed

export const IntroScreen = () => {
    const { nextStep } = useOnboarding();

    return (
        <div className="onboarding-layout" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ marginBottom: '40px' }}>
                <div style={{
                    display: 'inline-flex',
                    padding: '16px',
                    borderRadius: '50%',
                    background: 'var(--color-primary-light, #e0f2f1)',
                    marginBottom: '16px',
                    color: 'var(--color-primary)',
                    fontSize: '48px',
                    lineHeight: 1
                }}>
                    🥗
                </div>
                <h1 style={{ fontSize: '40px', color: 'var(--color-primary)', margin: '0 0 8px 0' }}>NutriRecipe</h1>
                <p>Your personalized culinary journey starts here.</p>
            </div>
            <Button onClick={nextStep} size="lg" fullWidth>
                Get Started
            </Button>
        </div>
    );
};
