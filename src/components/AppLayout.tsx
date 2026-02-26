import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, User, LogOut, ShieldAlert, Shield, Calendar, Landmark, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/students", label: "Students", icon: Users },
  ];

  const studentLinks = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/profile", label: "Profile", icon: User },
    { to: "/student/risk", label: "Risk Analysis", icon: ShieldAlert },
    { to: "/student/schedule", label: "Smart Schedule", icon: Calendar },
    { to: "/student/schemes", label: "Schemes & Aid", icon: Landmark },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col gradient-sidebar border-r border-border">
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary neon-glow">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground font-display">Proactive Guard</h1>
            <p className="text-[11px] text-muted-foreground">Dropout Prevention</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex md:hidden items-center justify-between border-b border-border bg-card px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold font-display">Proactive Guard</span>
          </div>
          <div className="flex items-center gap-1">
            {links.map(link => {
              const active = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to}>
                  <Button variant={active ? "default" : "ghost"} size="sm" className={active ? "gradient-primary" : ""}>
                    <link.icon className="h-4 w-4" />
                  </Button>
                </Link>
              );
            })}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
