import AdditionalSetting from "@/components/onboarding/AdditionalSetting";
import Summary from "@/components/onboarding/Summary";
import { OnboardingFormProvider } from "@/context/OnboardingForm";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Onboarding = async () => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");
  console.log(session);

  return (
    <OnboardingFormProvider session={session}>
      <main className="min-h-screen dark:bg-[#0e0707] dark:text-[#f03d3d] flex items-start justify-center">
        <div className="flex items-center justify-center w-full max-w-auto">
          {/* Left: Steps */}
          <div className="dark:bg-[#0e0707] rounded-2xl shadow-md">
            <AdditionalSetting/>
          </div>
        </div>
      </main>
    </OnboardingFormProvider>
  );
};

export default Onboarding;
