
import { Goal } from "@/types/gantt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";

interface GoalsListProps {
  goals: Goal[];
  onToggleExpand: (goalId: string) => void;
}

const GoalsList = ({ goals, onToggleExpand }: GoalsListProps) => {
  // Helper to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Helper to format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-[400px]">
      {goals.map((goal) => (
        <div key={goal.id}>
          {/* Goal row */}
          <div
            className="flex items-center border-b px-4 py-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => onToggleExpand(goal.id)}
          >
            <div className="mr-2">
              {goal.expanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={goal.owner.avatar} alt={goal.owner.name} />
              <AvatarFallback>{getInitials(goal.owner.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{goal.title}</span>
              <span className="block text-xs text-gray-400 mt-1">
                {formatDate(goal.startDate)} – {formatDate(goal.endDate)}
              </span>
            </div>
          </div>
          {/* Milestone rows */}
          {goal.expanded &&
            goal.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center border-b px-4 py-3 pl-10 bg-gray-50 hover:bg-gray-100"
              >
                <CheckCircle className="h-4 w-4 text-gray-300 mr-3" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm truncate">{milestone.title}</span>
                  <span className="block text-xs text-gray-400 mt-1">
                    {formatDate(milestone.startDate)} – {formatDate(milestone.endDate)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default GoalsList;
