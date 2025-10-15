import { getAuthSession } from "@/lib/auth";
import SidebarContainer from "./SidebarContainer";
import { getWorkspaces } from "@/lib/api";

const Sidebar = async () => {
  const session = await getAuthSession();
  if(!session) return null;

  const userWorkspaces = await getWorkspaces(session.user.id)
 
  return (
    <SidebarContainer userWorkspace={userWorkspaces} />
  );
};

export default Sidebar;