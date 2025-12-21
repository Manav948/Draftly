export const compareDate = (
  a: { updated: { at: Date | string | null } },
  b: { updated: { at: Date | string | null } },
  ascending: boolean
) => {
  const aTime = a.updated.at ? new Date(a.updated.at).getTime() : 0
  const bTime = b.updated.at ? new Date(b.updated.at).getTime() : 0

  return ascending ? aTime - bTime : bTime - aTime
}
