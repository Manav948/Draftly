import { LoadingState } from "../ui/LoadingState"

export const LoadingScreen = () => {
    return (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex w-full h-full items-center justify-center">
            <LoadingState className="h-12 w-12"/>    
        </div>
    )
}