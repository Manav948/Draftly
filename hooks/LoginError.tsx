import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
export const LoginError = (showLoggedinfo: boolean) => {
    const params = useSearchParams()
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        const error = params.get("error");
        if (error && session.status === "unauthenticated") {
            switch (error) {
                case "OAuthAccountNotLinked":
                    toast.error("Your Account is not Linked please do it!")
                    break;
                case "OAuthCreatedAccount":
                    toast.error("Error Occur during Account Creation")
                    break;
                case "Callback":
                    toast.error("Error come from callback function")
                    break;
                default:
                    toast.error("Something went wrong in Loged in")
            }
            const timer = setTimeout(() => {
                router.replace("/sign-in")
            }, 2000)
            return () => {
                clearTimeout(timer)
            }
        }
        if (session.status === "authenticated" && showLoggedinfo) {
            toast.success("Logged in Succesfully")
        }
    }, [params, showLoggedinfo, session, router])
}