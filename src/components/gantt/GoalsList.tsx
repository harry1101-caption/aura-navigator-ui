
import { Goal } from "@/types/gantt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";

interface GoalsListProps {
  goals: Goal[];
  onToggleExpand: (goalId: string) => void;
}

// Helper to get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const GoalsList = ({ goals, onToggleExpand }: GoalsListProps) => {
  return (
    <div className="min-h-[400px]">
      {goals.map((goal) => (
        <div key={goal.id}>
          {/* Goal row */}
          <div
            className="flex items-center h-8 border-b px-3 py-1.5 hover:bg-gray-50 cursor-pointer"
            onClick={() => onToggleExpand(goal.id)}
          >
            <div className="mr-2">
              {goal.expanded ? (
                <ChevronDown className="h-3 w-3 text-gray-400" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-400" />
              )}
            </div>
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={goal.owner.avatar} alt={goal.owner.name} />
              <AvatarFallback>{getInitials(goal.owner.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium truncate">{goal.title}</span>
            </div>
          </div>

          {/* Milestone rows */}
          {goal.expanded &&
            goal.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center h-8 border-b px-3 py-1.5 pl-8 bg-gray-50 hover:bg-gray-100"
              >
                <CheckCircle className="h-3 w-3 text-gray-300 mr-2" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs truncate">{milestone.title}</span>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default GoalsList;
