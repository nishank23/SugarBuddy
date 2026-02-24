import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="max-w-md mx-auto relative min-h-screen" style={{ background: "#FAFAFE" }}>
      <Outlet />
      <BottomNav />
    </div>
  );
}
