"use client"

import { Action, ActionType, OnboardingFormContext, OnBoardingFormReducer } from "@/types/onBoardingContext"
import { Session } from "next-auth"
import { createContext, useContext, useReducer } from "react"

export const OnboardingFormCtx = createContext<OnboardingFormContext | null>(
    null
)

function onBoardingFormReducer(state: OnBoardingFormReducer, action: Action) {
    const { type, payload } = action

    switch (type) {
        case ActionType.CHANGE_SITE: {
            return {
                ...state,
                currentStep: payload as 1 | 2 | 3,
            }
        }
        default:
            return state;
    }
}

interface Props {
    children: React.ReactNode;
    session: Session
}

const initialFormState: OnBoardingFormReducer = {
    currentStep: 1,
    name: null,
    surname: null,
    profileImage: null,
    useCase: null,
    workspace: ""
}

export const OnboardingFormProvider = ({ children, session }: Props) => {
    const [state, dispatch] = useReducer(
        onBoardingFormReducer, {
        ...initialFormState,
        name: session.user?.name ?? null,
        surname: session.user?.surname ?? null,
        profileImage: session.user?.image ?? null,
    })
    return (
        <OnboardingFormCtx.Provider value={{ ...state, dispatch }}>
            {children}
        </OnboardingFormCtx.Provider >
    )
}

export const useOnboardingForm = () => {
    const ctx = useContext(OnboardingFormCtx)
    if (!ctx) throw new Error("invalide use")
    return ctx
}