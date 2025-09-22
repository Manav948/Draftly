import { UseCase } from "@prisma/client";

export enum ActionType {
    CHANGE_SITE = "CHANGE_SITE",
    NAME = "NAME",
    SURNAME = "SURNAME",
    PROFILEIMAGE = "PROFILEIMAGE",
    USECASE = "USECASE",
    WORKSPACE_NAME = "WORKSPACE_NAME",
    WORKSPACE_IMAGE = "WORKSPACE_IMAGE"
 }

export interface Action {
    type: ActionType,
    payload: string | number | UseCase | undefined
}

export interface OnBoardingFormReducer {
    currentStep: 1 | 2 | 3 | 4,
    name: string | null,
    surname: string | null,
    profileImage: string | null,
    useCase: UseCase | null,
    workspaceName: string | null
    workspaceImage?: string | null;
}
export interface OnboardingFormContext extends OnBoardingFormReducer {
    dispatch: React.Dispatch<Action>
}