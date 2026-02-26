import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "Low" | "Medium" | "High";
  score?: number;
  size?: "sm" | "md" | "lg";
}

const RiskBadge = ({ level, score, size = "md" }: RiskBadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base font-semibold",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium",
      sizeClasses[size],
      level === "Low" && "bg-risk-low-bg text-risk-low",
      level === "Medium" && "bg-risk-medium-bg text-risk-medium",
      level === "High" && "bg-risk-high-bg text-risk-high",
    )}>
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        level === "Low" && "bg-risk-low",
        level === "Medium" && "bg-risk-medium",
        level === "High" && "bg-risk-high",
      )} />
      {level} Risk{score !== undefined && ` (${score})`}
    </span>
  );
};

export default RiskBadge;
