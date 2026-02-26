import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CREDENTIALS } from "@/data/students";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ShieldCheck, User, AlertCircle, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<"admin" | "student">("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (selectedRole === "admin") {
      if (username === CREDENTIALS.admin.username && password === CREDENTIALS.admin.password) {
        login("admin");
        navigate("/admin");
        return;
      }
    } else {
      const found = CREDENTIALS.students.find(s => s.username === username && s.password === password);
      if (found) {
        login("student", found.id);
        navigate("/student");
        return;
      }
    }
    setError("Invalid credentials. Please try again.");
  };

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary neon-glow">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold font-display text-foreground">Proactive Guard</span>
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl font-bold leading-tight font-display text-foreground">
              Proactive Guard
            </h2>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              AI-Powered Student Dropout Prevention — Predict risks, deploy interventions, and secure futures.
            </p>
            <div className="flex gap-8 text-sm">
              <div className="glass-card rounded-xl p-4 text-center min-w-[100px]">
                <span className="text-3xl font-bold text-primary block">95%</span>
                <span className="text-muted-foreground text-xs">Accuracy</span>
              </div>
              <div className="glass-card rounded-xl p-4 text-center min-w-[100px]">
                <span className="text-3xl font-bold text-accent block">40%</span>
                <span className="text-muted-foreground text-xs">Dropout ↓</span>
              </div>
              <div className="glass-card rounded-xl p-4 text-center min-w-[100px]">
                <span className="text-3xl font-bold text-risk-low block">500+</span>
                <span className="text-muted-foreground text-xs">Helped</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground relative z-10">© 2024 Proactive Guard — Hackathon Prototype</p>
      </div>

      {/* Right panel — login form */}
      <div className="flex flex-1 items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary neon-glow">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl font-display">Proactive Guard</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-display">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          {/* Role selector */}
          <div className="flex gap-3">
            {(["admin", "student"] as const).map(role => (
              <button
                key={role}
                onClick={() => { setSelectedRole(role); setUsername(""); setPassword(""); setError(""); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all duration-300",
                  selectedRole === role
                    ? "border-primary bg-primary/10 text-primary neon-glow"
                    : "border-border text-muted-foreground hover:border-primary/30 glass-card"
                )}
              >
                {role === "admin" ? <ShieldCheck className="h-5 w-5" /> : <User className="h-5 w-5" />}
                {role === "admin" ? "Admin" : "Student"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-muted-foreground">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder={selectedRole === "admin" ? "admin" : "aarav"}
                  className="pl-10 bg-secondary/50 border-border focus:border-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={selectedRole === "admin" ? "admin123" : "student123"}
                  className="pl-10 bg-secondary/50 border-border focus:border-primary"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full gradient-primary hover:opacity-90 transition-opacity h-11 text-base font-semibold gap-2 neon-glow">
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="glass-card rounded-xl p-4 text-xs text-muted-foreground space-y-1.5">
            <p className="font-medium text-foreground text-sm">Demo Credentials</p>
            <p>Admin: <code className="font-mono text-primary">admin / admin123</code></p>
            <p>Student: <code className="font-mono text-accent">aarav / student123</code> (or any first name)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
