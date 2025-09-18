import AdditionalSetting from "@/components/onboarding/AdditionalSetting";
import Summary from "@/components/onboarding/Summary";
import { OnboardingFormProvider } from "@/context/OnboardingForm";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

const Onboarding = async () => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");
  console.log(session);

  return (
    <OnboardingFormProvider session={session}>
      <main className="min-h-screen bg-background flex items-start justify-center px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Left: Steps */}
          <div className="bg-card p-6 rounded-2xl shadow-md">
            <AdditionalSetting />
          </div>

          {/* Right: Summary */}
          <div className="bg-card p-6 rounded-2xl shadow-md sticky top-10 h-fit">
            <Summary />
          </div>
        </div>
      </main>
    </OnboardingFormProvider>
  );
};

export default Onboarding;
