import JKiltroBrand from "@/components/JKiltroBrand";
import UserAvatar from "@/components/UserAvatar";

import NavbarBody from "./NavbarBody";
import { useAuth } from "@/contexts/Auth/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container px-0">
        <JKiltroBrand />

        <NavbarBody />

        <UserAvatar userData={user} />
      </div>
    </nav>
  );
}
