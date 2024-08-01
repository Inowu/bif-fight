"use client";
import { useUser } from "@/app/context/UserContext";
import "./Navbar.scss";
import { logOut } from "@/services/auth/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export const Navbar = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logOut().then(() => {
      router.push("/login");
    });
  };

  useEffect(() => {
    if (!loading && user === null && pathname === "/") {
      router.push("/login");
    }
  }, [user, loading]);

  return (
    <>
      {!loading && pathname === "/" && (
        <nav>
          <img src="/assets/logos/logo.jpeg" alt="bif" />
          {user && user.name ? (
            <div className="user-container">
              <p>{user.name}</p>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <button>Iniciar sesión</button>
          )}
        </nav>
      )}
    </>
  );
};
