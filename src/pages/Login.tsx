import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CREDENTIALS } from "@/data/students";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ShieldCheck, User, AlertCircle } from "lucide-react";
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
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary flex-col justify-between p-12 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">EduGuard AI</span>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight font-display">
            AI-Powered Student<br />Dropout Prevention
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Predict at-risk students early, understand contributing factors, and deploy targeted interventions — all powered by intelligent analytics.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/70">
            <div><span className="text-2xl font-bold text-primary-foreground block">95%</span>Prediction Accuracy</div>
            <div><span className="text-2xl font-bold text-primary-foreground block">40%</span>Dropout Reduction</div>
            <div><span className="text-2xl font-bold text-primary-foreground block">500+</span>Students Helped</div>
          </div>
        </div>
        <p className="text-xs text-primary-foreground/50">© 2024 EduGuard AI — Hackathon Prototype</p>
      </div>

      {/* Right panel — login form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">EduGuard AI</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          {/* Role selector */}
          <div className="flex gap-3">
            {(["admin", "student"] as const).map(role => (
              <button
                key={role}
                onClick={() => { setSelectedRole(role); setUsername(""); setPassword(""); setError(""); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-all",
                  selectedRole === role
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                )}
              >
                {role === "admin" ? <ShieldCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
                {role === "admin" ? "Admin" : "Student"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={selectedRole === "admin" ? "admin" : "aarav"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={selectedRole === "admin" ? "admin123" : "student123"}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">Sign In</Button>
          </form>

          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Demo Credentials</p>
            <p>Admin: <code className="font-mono">admin / admin123</code></p>
            <p>Student: <code className="font-mono">aarav / student123</code> (or any first name)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
