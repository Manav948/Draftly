import { UseCase } from "@prisma/client";

export enum ActionType {
    CHANGE_SITE = "CHANGE_SITE",
    NAME = "NAME",
    SURNAME = "SURNAME",
    PROFILEIMAGE = "PROFILEIMAGE",
    USECASE = "USECASE",
    WORKSPACE = "WORKSPACE"
}

export interface Action {
    type: ActionType,
    payload: string | number | UseCase
}

export interface OnBoardingFormReducer {
    currentStep: 1 | 2 | 3,
    name: string | null,
    surname: string | null,
    profileImage: string | null,
    useCase: UseCase | null,
    workspace: string | null
}
export interface OnboardingFormContext extends OnBoardingFormReducer {
    dispatch: React.Dispatch<Action>
}