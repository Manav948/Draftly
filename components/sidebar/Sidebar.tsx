import { getAuthSession } from "@/lib/auth";
import SidebarContainer from "./SidebarContainer";
import { getUserAdminWorkspaces, getWorkspaces } from "@/lib/api";

const Sidebar = async () => {
  const session = await getAuthSession();
  if (!session) return null;

  const [userWorkspaces, userAdminWorkspaces] = await Promise.all([getWorkspaces(session.user.id), getUserAdminWorkspaces(session.user.id)])

  return (
    <SidebarContainer userWorkspace={userWorkspaces} userId={session.user.id} userAdminWorkspaces={userAdminWorkspaces} />
  );
};

export default Sidebar;