import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Clock, Sun, Moon, Sunrise, Coffee, BookOpen, Dumbbell, Brain, Utensils, Bed } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleBlock {
  time: string;
  activity: string;
  type: "study" | "break" | "exercise" | "meal" | "sleep" | "focus";
  icon: React.ElementType;
  tip?: string;
}

function generateSchedule(chronotype: "Early Bird" | "Night Owl" | "Flexible"): ScheduleBlock[] {
  if (chronotype === "Early Bird") {
    return [
      { time: "5:00 AM", activity: "Wake Up & Freshen Up", type: "break", icon: Sunrise },
      { time: "5:30 AM", activity: "Morning Exercise / Yoga", type: "exercise", icon: Dumbbell, tip: "Physical activity boosts cognitive function by 20%" },
      { time: "6:30 AM", activity: "Breakfast", type: "meal", icon: Utensils },
      { time: "7:00 AM", activity: "Deep Study — Hardest Subject", type: "focus", icon: Brain, tip: "Early birds peak cognitively between 7-10 AM" },
      { time: "9:00 AM", activity: "College / Classes", type: "study", icon: BookOpen },
      { time: "12:30 PM", activity: "Lunch Break", type: "meal", icon: Utensils },
      { time: "1:30 PM", activity: "Light Review / Assignments", type: "study", icon: BookOpen, tip: "Post-lunch dip — do lighter tasks" },
      { time: "3:00 PM", activity: "Library Session", type: "focus", icon: Brain, tip: "Increase library visits to improve academic performance" },
      { time: "5:00 PM", activity: "Break / Socialize", type: "break", icon: Coffee },
      { time: "5:30 PM", activity: "Revision & Practice", type: "study", icon: BookOpen },
      { time: "7:30 PM", activity: "Dinner", type: "meal", icon: Utensils },
      { time: "8:00 PM", activity: "Light Reading / Next-Day Prep", type: "study", icon: BookOpen },
      { time: "9:30 PM", activity: "Wind Down & Sleep", type: "sleep", icon: Bed, tip: "7-8 hours sleep is crucial for memory consolidation" },
    ];
  } else if (chronotype === "Night Owl") {
    return [
      { time: "8:00 AM", activity: "Wake Up & Freshen Up", type: "break", icon: Sunrise },
      { time: "8:30 AM", activity: "Light Breakfast & News", type: "meal", icon: Utensils },
      { time: "9:00 AM", activity: "College / Classes", type: "study", icon: BookOpen },
      { time: "12:30 PM", activity: "Lunch Break", type: "meal", icon: Utensils },
      { time: "1:30 PM", activity: "Assignments & Group Study", type: "study", icon: BookOpen },
      { time: "3:30 PM", activity: "Exercise / Walk", type: "exercise", icon: Dumbbell, tip: "Afternoon exercise helps night owls stay alert" },
      { time: "4:30 PM", activity: "Break / Socialize", type: "break", icon: Coffee },
      { time: "5:30 PM", activity: "Library Research Session", type: "focus", icon: Brain, tip: "Use library resources to supplement learning" },
      { time: "7:30 PM", activity: "Dinner", type: "meal", icon: Utensils },
      { time: "8:30 PM", activity: "Deep Focus Study — Hardest Subject", type: "focus", icon: Brain, tip: "Night owls peak cognitively between 8 PM - 12 AM" },
      { time: "10:30 PM", activity: "Practice Problems / Revision", type: "study", icon: BookOpen },
      { time: "12:00 AM", activity: "Wind Down & Sleep", type: "sleep", icon: Bed, tip: "Avoid screens 30 min before bed for better sleep" },
    ];
  } else {
    return [
      { time: "7:00 AM", activity: "Wake Up & Morning Routine", type: "break", icon: Sunrise },
      { time: "7:30 AM", activity: "Quick Exercise / Stretch", type: "exercise", icon: Dumbbell },
      { time: "8:00 AM", activity: "Breakfast", type: "meal", icon: Utensils },
      { time: "8:30 AM", activity: "Focused Study Block 1", type: "focus", icon: Brain, tip: "Use Pomodoro technique: 25 min study, 5 min break" },
      { time: "9:30 AM", activity: "College / Classes", type: "study", icon: BookOpen },
      { time: "12:30 PM", activity: "Lunch Break", type: "meal", icon: Utensils },
      { time: "1:30 PM", activity: "Assignments / Projects", type: "study", icon: BookOpen },
      { time: "3:30 PM", activity: "Library Visit", type: "focus", icon: Brain, tip: "Regular library visits correlate with better grades" },
      { time: "5:00 PM", activity: "Break / Hobbies", type: "break", icon: Coffee },
      { time: "6:00 PM", activity: "Focused Study Block 2", type: "focus", icon: Brain },
      { time: "7:30 PM", activity: "Dinner", type: "meal", icon: Utensils },
      { time: "8:30 PM", activity: "Revision / Next Day Prep", type: "study", icon: BookOpen },
      { time: "10:00 PM", activity: "Wind Down & Sleep", type: "sleep", icon: Bed },
    ];
  }
}

const typeColors: Record<string, string> = {
  study: "border-l-primary text-primary",
  focus: "border-l-accent text-accent",
  break: "border-l-muted-foreground text-muted-foreground",
  exercise: "border-l-risk-low text-risk-low",
  meal: "border-l-risk-medium text-risk-medium",
  sleep: "border-l-primary text-primary",
};

const SmartSchedule = () => {
  const { studentId } = useAuth();
  const { students } = useData();
  const student = students.find(s => s.id === studentId);

  if (!student) return <div className="text-center py-20 text-muted-foreground">Student not found</div>;

  const schedule = generateSchedule(student.chronotype);

  const chronotypeInfo = {
    "Early Bird": { icon: Sunrise, color: "text-risk-medium", desc: "You're most productive in the morning. We've front-loaded deep work." },
    "Night Owl": { icon: Moon, color: "text-primary", desc: "You peak in the evening. Deep study is scheduled later in the day." },
    "Flexible": { icon: Sun, color: "text-accent", desc: "You adapt well. We've balanced your day with varied focus blocks." },
  };

  const info = chronotypeInfo[student.chronotype];
  const ChronoIcon = info.icon;

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-display">AI Smart Schedule</h1>
        <p className="text-sm text-muted-foreground">Personalized daily routine based on your chronotype</p>
      </div>

      {/* Chronotype card */}
      <div className="glass-card rounded-xl p-5 border border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ChronoIcon className={cn("h-5 w-5", info.color)} />
          </div>
          <div>
            <h3 className="text-sm font-bold">Your Chronotype: {student.chronotype}</h3>
            <p className="text-xs text-muted-foreground">{info.desc}</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{student.libraryUsage}</p>
          <p className="text-xs text-muted-foreground">Library visits/month</p>
          <p className="text-[10px] text-muted-foreground mt-1">{student.libraryUsage < 5 ? "⚠ Try 2+ more visits" : "✓ Good frequency"}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-accent">{student.orientationAttendance}%</p>
          <p className="text-xs text-muted-foreground">Orientation attendance</p>
          <p className="text-[10px] text-muted-foreground mt-1">{student.orientationAttendance < 60 ? "⚠ Attend more events" : "✓ Active participation"}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-risk-low">{student.engagementScore}/100</p>
          <p className="text-xs text-muted-foreground">Engagement score</p>
          <p className="text-[10px] text-muted-foreground mt-1">{student.engagementScore < 50 ? "⚠ Engage more in class" : "✓ Active engagement"}</p>
        </div>
      </div>

      {/* Schedule */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Recommended Daily Schedule</h3>
        </div>
        <div className="space-y-2">
          {schedule.map((block, i) => {
            const Icon = block.icon;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 rounded-lg border-l-4 bg-secondary/30 p-3 transition-colors hover:bg-secondary/50",
                  typeColors[block.type]?.split(" ")[0]
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary shrink-0">
                  <Icon className={cn("h-4 w-4", typeColors[block.type]?.split(" ")[1])} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{block.time}</span>
                    <span className="text-sm font-medium">{block.activity}</span>
                  </div>
                  {block.tip && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 ml-[72px]">💡 {block.tip}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartSchedule;
