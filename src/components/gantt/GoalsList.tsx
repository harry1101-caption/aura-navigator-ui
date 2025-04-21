
import { Goal } from "@/types/gantt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import { format } from "date-fns";

// Utility to get color class for the progress badge
const getProgressBadgeColor = (progress: number) => {
  if (progress <= 33) return "bg-red-500 text-white";
  if (progress <= 80) return "bg-blue-500 text-white";
  return "bg-green-500 text-white";
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
          {/* Goal row with progress badge */}
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
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium truncate">{goal.title}</span>
                <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${getProgressBadgeColor(goal.progress)}`}>
                  {goal.progress}%
                </span>
              </div>
              <div className="flex text-xs text-gray-500 mt-1">
                <span>{format(goal.startDate, "MMM d")} - {format(goal.endDate, "MMM d, yyyy")}</span>
              </div>
            </div>
          </div>

          {/* Milestone rows with progress indicators */}
          {goal.expanded && goal.milestones.map((milestone) => (
            <div 
              key={milestone.id}
              className="flex items-center border-b px-4 py-3 pl-10 bg-gray-50 hover:bg-gray-100"
            >
              <CheckCircle className={`h-4 w-4 ${milestone.progress === 100 ? 'text-green-500' : 'text-gray-300'} mr-3`} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm truncate">{milestone.title}</span>
                  <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${getProgressBadgeColor(milestone.progress)}`}>
                    {milestone.progress}%
                  </span>
                </div>
                <div className="flex text-xs text-gray-500 mt-1">
                  <span>{format(milestone.startDate, "MMM d")} - {format(milestone.endDate, "MMM d, yyyy")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GoalsList;
