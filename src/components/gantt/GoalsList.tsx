
import { Goal } from "@/types/gantt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import { format } from "date-fns";

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
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{goal.title}</span>
                <span className="text-xs text-gray-500 bg-blue-100 rounded-full px-2 py-0.5">
                  {goal.progress}%
                </span>
              </div>
              <Progress value={goal.progress} className="h-1.5" />
              <div className="text-xs text-gray-500 mt-1">
                {format(goal.startDate, "MMM d")} - {format(goal.endDate, "MMM d, yyyy")}
              </div>
            </div>
          </div>
          
          {goal.expanded && goal.milestones.map((milestone) => (
            <div 
              key={milestone.id}
              className="flex items-center border-b px-4 py-3 pl-10 bg-gray-50"
            >
              <CheckCircle className={`h-4 w-4 ${milestone.progress === 100 ? 'text-green-500' : 'text-gray-300'} mr-3`} />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{milestone.title}</span>
                  <span className="text-xs text-gray-500 bg-blue-100 rounded-full px-2 py-0.5">
                    {milestone.progress}%
                  </span>
                </div>
                <Progress value={milestone.progress} className="h-1.5" />
                <div className="text-xs text-gray-500 mt-1">
                  {format(milestone.startDate, "MMM d")} - {format(milestone.endDate, "MMM d, yyyy")}
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
