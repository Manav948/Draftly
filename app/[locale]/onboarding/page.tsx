import AdditionalSetting from "@/components/onboarding/AdditionalSetting"
import Summary from "@/components/onboarding/Summary"
import { OnboardingFormProvider } from "@/context/OnboardingForm"
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding"

const Onboarding = async () => {
    const session = await checkIfUserCompletedOnboarding("/onboarding")
    console.log(session)

    return <OnboardingFormProvider session={session}>
        <AdditionalSetting />
        <Summary />
    </OnboardingFormProvider>
}

export default Onboarding