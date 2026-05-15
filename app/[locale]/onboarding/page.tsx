import AdditionalSetting from "@/components/onboarding/AdditionalSetting";
import { OnboardingFormProvider } from "@/context/OnboardingForm";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Onboarding = async () => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");

  return (
    <OnboardingFormProvider session={session}>
      <main className="min-h-screen flex items-center justify-center px-4
        bg-white dark:bg-[#0c0c0c]">
        <div className="w-full max-w-2xl py-8 mt-12 sm:mt-0">
          <AdditionalSetting />
        </div>
      </main>
    </OnboardingFormProvider>
  );
};

export default Onboarding;
