import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Nav";

export default function Layout() {
  const { pathname } = useLocation();
  const noNavbarPaths = ["/login", "/register"];

  return (
    <div>
      {!noNavbarPaths.includes(pathname) && <Navbar />}
      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
