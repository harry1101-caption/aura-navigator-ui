
import { Goal } from "@/types/gantt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import { format } from "date-fns";

// Utility to get color class for the milestone progress badge
const getProgressBadgeColor = (progress: number) => {
  if (progress <= 33) return "bg-[#ea384c] text-white";
  if (progress <= 80) return "bg-[#0EA5E9] text-white";
  return "bg-[#F2FCE2] text-green-700 border border-green-400";
};

interface GoalsListProps {
  goals: Goal[];
  onToggleExpand: (goalId: string) => void;
}

const GoalsList = ({ goals, onToggleExpand }: GoalsListProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-[400px]">
      {goals.map((goal) => (
        <div key={goal.id}>
          {/* Goal row (no progress badge or date) */}
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
            <div className="flex-1">
              <span className="text-sm font-medium">{goal.title}</span>
            </div>
          </div>

          {/* Milestone rows, without progress indicator and start-end date */}
          {goal.expanded && goal.milestones.map((milestone) => (
            <div 
              key={milestone.id}
              className="flex items-center border-b px-4 py-3 pl-10 bg-gray-50"
            >
              <CheckCircle className={`h-4 w-4 ${milestone.progress === 100 ? 'text-green-500' : 'text-gray-300'} mr-3`} />
              <div className="flex-1">
                <span className="text-sm">{milestone.title}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GoalsList;

