import { useState } from "react";
import { useNavigate } from "react-router";
import { WelcomeScreen } from "./onboarding/WelcomeScreen";
import { EnterNameScreen } from "./onboarding/EnterNameScreen";
import { CharacterSelectionScreen } from "./onboarding/CharacterSelectionScreen";
import { NameBuddyScreen } from "./onboarding/NameBuddyScreen";
import { DiabetesInfoScreen } from "./onboarding/DiabetesInfoScreen";
import { RemindersScreen } from "./onboarding/RemindersScreen";
import { HealthIntegrationScreen } from "./onboarding/HealthIntegrationScreen";

type Step =
  | "welcome"
  | "enterName"
  | "characterSelection"
  | "nameBuddy"
  | "diabetesInfo"
  | "reminders"
  | "healthIntegration";

interface OnboardingData {
  userName: string;
  characterId: string;
  buddyName: string;
  diabetesType: string;
  ageGroup: string;
  reminders: any[];
  integrations: {
    appleHealth: boolean;
    googleFit: boolean;
  };
}

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [data, setData] = useState<Partial<OnboardingData>>({});

  const handleWelcomeContinue = () => {
    setCurrentStep("enterName");
  };

  const handleNameContinue = (userName: string) => {
    setData((prev) => ({ ...prev, userName }));
    setCurrentStep("characterSelection");
  };

  const handleCharacterContinue = (characterId: string) => {
    setData((prev) => ({ ...prev, characterId }));
    setCurrentStep("nameBuddy");
  };

  const handleBuddyNameContinue = (buddyName: string) => {
    setData((prev) => ({ ...prev, buddyName }));
    setCurrentStep("diabetesInfo");
  };

  const handleDiabetesInfoContinue = (diabetesType: string, ageGroup: string) => {
    setData((prev) => ({ ...prev, diabetesType, ageGroup }));
    setCurrentStep("reminders");
  };

  const handleRemindersContinue = (reminders: any[]) => {
    setData((prev) => ({ ...prev, reminders }));
    setCurrentStep("healthIntegration");
  };

  const handleRemindersSkip = () => {
    setData((prev) => ({ ...prev, reminders: [] }));
    setCurrentStep("healthIntegration");
  };

  const handleHealthIntegrationComplete = (integrations: {
    appleHealth: boolean;
    googleFit: boolean;
  }) => {
    // Save all onboarding data (in a real app, this would go to localStorage or a backend)
    const completeData = { ...data, integrations };
    console.log("Onboarding complete:", completeData);

    // Store in localStorage for now
    localStorage.setItem("sugarBuddyOnboarding", JSON.stringify(completeData));

    // Navigate to main app
    navigate("/app");
  };

  const goBack = () => {
    const stepOrder: Step[] = [
      "welcome",
      "enterName",
      "characterSelection",
      "nameBuddy",
      "diabetesInfo",
      "reminders",
      "healthIntegration",
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  // Calculate progress (skip welcome screen)
  const stepOrder: Step[] = [
    "welcome",
    "enterName",
    "characterSelection",
    "nameBuddy",
    "diabetesInfo",
    "reminders",
    "healthIntegration",
  ];
  const currentStepIndex = stepOrder.indexOf(currentStep);
  const totalSteps = stepOrder.length - 1; // Exclude welcome
  const progress = currentStep === "welcome" ? 0 : (currentStepIndex / totalSteps) * 100;

  return (
    <div className="max-w-md mx-auto relative">
      {/* Progress bar - hide on welcome screen */}
      {currentStep !== "welcome" && (
        <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto">
          <div className="h-1" style={{ background: "#E8E4F0" }}>
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%)",
              }}
            />
          </div>
        </div>
      )}

      {currentStep === "welcome" && <WelcomeScreen onContinue={handleWelcomeContinue} />}

      {currentStep === "enterName" && (
        <EnterNameScreen onContinue={handleNameContinue} onBack={goBack} />
      )}

      {currentStep === "characterSelection" && (
        <CharacterSelectionScreen
          onContinue={handleCharacterContinue}
          onBack={goBack}
          userName={data.userName || ""}
        />
      )}

      {currentStep === "nameBuddy" && (
        <NameBuddyScreen
          onContinue={handleBuddyNameContinue}
          onBack={goBack}
          characterId={data.characterId || ""}
        />
      )}

      {currentStep === "diabetesInfo" && (
        <DiabetesInfoScreen
          onContinue={handleDiabetesInfoContinue}
          onBack={goBack}
          characterId={data.characterId || ""}
          buddyName={data.buddyName || ""}
        />
      )}

      {currentStep === "reminders" && (
        <RemindersScreen
          onContinue={handleRemindersContinue}
          onSkip={handleRemindersSkip}
          onBack={goBack}
          buddyName={data.buddyName || ""}
        />
      )}

      {currentStep === "healthIntegration" && (
        <HealthIntegrationScreen
          onComplete={handleHealthIntegrationComplete}
          onBack={goBack}
          characterId={data.characterId || ""}
        />
      )}
    </div>
  );
}