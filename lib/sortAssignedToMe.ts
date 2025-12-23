import { AssignedToMeTasksAndMindMaps } from "@/types/extended";

export const sortAssignedToMeDataByCreated = (
    assignedAllData : AssignedToMeTasksAndMindMaps
) => {
    const sortedArray = [
        ...assignedAllData.mindMaps,
        ...assignedAllData.Task,
    ].sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return sortedArray
}