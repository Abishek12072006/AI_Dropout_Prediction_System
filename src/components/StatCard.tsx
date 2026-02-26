import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "risk-low" | "risk-medium" | "risk-high";
  className?: string;
}

const StatCard = ({ title, value, subtitle, icon, variant = "default", className }: StatCardProps) => {
  return (
    <div className={cn(
      "rounded-xl border bg-card p-5 shadow-sm animate-fade-in",
      className,
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn(
            "text-2xl font-bold tracking-tight",
            variant === "primary" && "text-primary",
            variant === "risk-low" && "text-risk-low",
            variant === "risk-medium" && "text-risk-medium",
            variant === "risk-high" && "text-risk-high",
            variant === "default" && "text-foreground",
          )}>{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {icon && (
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            variant === "primary" && "bg-primary/10 text-primary",
            variant === "risk-low" && "bg-risk-low-bg text-risk-low",
            variant === "risk-medium" && "bg-risk-medium-bg text-risk-medium",
            variant === "risk-high" && "bg-risk-high-bg text-risk-high",
            variant === "default" && "bg-muted text-muted-foreground",
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
