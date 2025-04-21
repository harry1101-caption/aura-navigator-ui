
import { Goal } from "@/types/gantt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import { differenceInDays } from "date-fns";

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

interface TimelineBarProps {
  startDate: Date;
  endDate: Date;
  progress: number;
  rangeStart: Date;
  rangeEnd: Date;
}

const TimelineBar = ({
  startDate,
  endDate,
  progress,
  rangeStart,
  rangeEnd,
}: TimelineBarProps) => {
  const totalRange = Math.max(1, differenceInDays(rangeEnd, rangeStart));
  const startOffset = Math.max(0, differenceInDays(startDate, rangeStart));
  const duration = Math.max(1, differenceInDays(endDate, startDate));
  const leftPct = (startOffset / totalRange) * 100;
  const widthPct = (duration / totalRange) * 100;

  // Progress overlay
  const progressWidth = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative h-3 w-full mt-2 bg-gray-100 rounded overflow-hidden">
      <div
        className="absolute h-full rounded bg-gray-300/60"
        style={{
          left: `${leftPct}%`,
          width: `${widthPct}%`,
        }}
      >
        <div
          className={`h-full rounded transition-all ${getProgressBadgeColor(progress)}`}
          style={{
            width: `${progressWidth}%`,
            minWidth: "8px"
          }}
        />
      </div>
    </div>
  );
};

const GoalsList = ({ goals, onToggleExpand }: GoalsListProps) => {
  // Calculate the overall min/max dates across all goals/milestones for consistent timeline scales
  let globalStart = new Date();
  let globalEnd = new Date();
  goals.forEach(goal => {
    if (goal.startDate < globalStart) globalStart = goal.startDate;
    if (goal.endDate > globalEnd) globalEnd = goal.endDate;
    goal.milestones.forEach(milestone => {
      if (milestone.startDate < globalStart) globalStart = milestone.startDate;
      if (milestone.endDate > globalEnd) globalEnd = milestone.endDate;
    });
  });

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
                <span className="text-sm font-medium truncate">
                  {goal.title}
                </span>
                <span
                  className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${getProgressBadgeColor(goal.progress)}`}
                >
                  {goal.progress}%
                </span>
              </div>
              {/* Timeline mini chart for goal */}
              <TimelineBar
                startDate={goal.startDate}
                endDate={goal.endDate}
                progress={goal.progress}
                rangeStart={globalStart}
                rangeEnd={globalEnd}
              />
              {/* Removed date string */}
            </div>
          </div>

          {/* Milestone rows with progress indicators */}
          {goal.expanded &&
            goal.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center border-b px-4 py-3 pl-10 bg-gray-50 hover:bg-gray-100"
              >
                <CheckCircle
                  className={`h-4 w-4 ${
                    milestone.progress === 100
                      ? "text-green-500"
                      : "text-gray-300"
                  } mr-3`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm truncate">
                      {milestone.title}
                    </span>
                    <span
                      className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${getProgressBadgeColor(milestone.progress)}`}
                    >
                      {milestone.progress}%
                    </span>
                  </div>
                  {/* Timeline mini chart for milestone */}
                  <TimelineBar
                    startDate={milestone.startDate}
                    endDate={milestone.endDate}
                    progress={milestone.progress}
                    rangeStart={globalStart}
                    rangeEnd={globalEnd}
                  />
                  {/* Removed date string */}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default GoalsList;
