import { Ghost } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Menubar,
  MenubarMenu,
} from "../../components/ui/menubar";
import { useAuth } from "../utils/AuthContext";

export function Menu() {
  const { logout } = useAuth();
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <Button variant="ghost" className="font-bold">
          StreamHub
        </Button>
      </MenubarMenu>
      <MenubarMenu>
        <Button variant="ghost">Account</Button>
      </MenubarMenu>
      <MenubarMenu>
        <Button variant="ghost" onClick={() => logout()}>
          Logout
        </Button>
      </MenubarMenu>
    </Menubar>
  );
}
