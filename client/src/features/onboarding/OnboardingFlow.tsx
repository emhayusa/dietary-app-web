
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import { IntroScreen } from './pages/IntroScreen';
import { StepGoal } from './pages/StepGoal';
// Placeholder steps for now
import { StepPreferences } from './pages/StepPreferences';
import { StepAllergies } from './pages/StepAllergies';
import { StepTargets } from './pages/StepTargets';
import { StepTime } from './pages/StepTime';

const FlowContent = () => {
    const { currentStep } = useOnboarding();

    switch (currentStep) {
        case 0: return <IntroScreen />;
        case 1: return <StepGoal />;
        case 2: return <StepPreferences />;
        case 3: return <StepAllergies />;
        case 4: return <StepTargets />;
        case 5: return <StepTime />;
        default: return <IntroScreen />;
    }
};

const OnboardingFlow = () => {
    return (
        <OnboardingProvider>
            <FlowContent />
        </OnboardingProvider>
    )
}

export default OnboardingFlow;
