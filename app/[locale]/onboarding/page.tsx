import AdditionalSetting from "@/components/onboarding/AdditionalSetting";
import { OnboardingFormProvider } from "@/context/OnboardingForm";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Onboarding = async () => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");

  return (
    <OnboardingFormProvider session={session}>
      <main className="min-h-screen flex items-center justify-center px-4
        bg-background dark:bg-[#0b0606]">
        <div className="w-full max-w-2xl">
          <AdditionalSetting />
        </div>
      </main>
    </OnboardingFormProvider>
  );
};

export default Onboarding;
