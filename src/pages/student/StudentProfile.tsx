import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { User, MapPin, Wifi, WifiOff, IndianRupee, GraduationCap, Library, Calendar } from "lucide-react";

const StudentProfile = () => {
  const { studentId } = useAuth();
  const { students } = useData();
  const student = students.find(s => s.id === studentId);

  if (!student) return <div className="text-center py-20 text-muted-foreground">Student not found</div>;

  const fields = [
    { label: "Full Name", value: student.name, icon: User },
    { label: "Register Number", value: student.registerNumber, icon: GraduationCap },
    { label: "Department", value: student.department, icon: GraduationCap },
    { label: "Year", value: `Year ${student.year}`, icon: GraduationCap },
    { label: "Attendance", value: `${student.attendance}%`, icon: Calendar },
    { label: "Avg Internal Marks", value: Math.round(student.internalMarks.reduce((a, b) => a + b, 0) / student.internalMarks.length), icon: GraduationCap },
    { label: "Library Usage", value: `${student.libraryUsage} visits/month`, icon: Library },
    { label: "Orientation Attendance", value: `${student.orientationAttendance}%`, icon: Calendar },
    { label: "Caste Category", value: student.caste, icon: User },
    { label: "Family Income Range", value: student.familyIncomeRange, icon: IndianRupee },
    { label: "Commute Distance", value: `${student.commuteDistance} km`, icon: MapPin },
    { label: "Internet Access", value: student.internetAccess ? "Yes" : "No", icon: student.internetAccess ? Wifi : WifiOff },
    { label: "Chronotype", value: student.chronotype, icon: Calendar },
  ];

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-display">My Profile</h1>
        <p className="text-sm text-muted-foreground">Your personal and academic information</p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="gradient-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20 text-2xl font-bold">
              {student.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-sm text-primary-foreground/80">{student.email}</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {fields.map(f => (
            <div key={f.label} className="flex items-center px-6 py-4">
              <div className="flex items-center gap-3 flex-1">
                <f.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{f.label}</span>
              </div>
              <span className="text-sm font-medium">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
