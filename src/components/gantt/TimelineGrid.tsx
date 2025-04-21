
import { 
  differenceInDays, 
  eachDayOfInterval,
  isSameDay,
  format,
  startOfMonth,
  isFirstDayOfMonth
} from "date-fns";
import { Goal, TimeUnit } from "@/types/gantt";

interface TimelineGridProps {
  goals: Goal[];
  timeUnit: TimeUnit;
  startDate: Date;
  endDate: Date;
}

const TimelineGrid = ({ goals, timeUnit, startDate, endDate }: TimelineGridProps) => {
  // Generate all days in the range for positioning
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Calculate position for an item (goal or milestone)
  const calculateItemPosition = (itemStart: Date, itemEnd: Date) => {
    const totalDays = differenceInDays(endDate, startDate) + 1;
    const itemStartDays = Math.max(0, differenceInDays(itemStart, startDate));
    const itemDuration = Math.min(
      differenceInDays(itemEnd, itemStart) + 1,
      differenceInDays(endDate, itemStart) + 1
    );
    
    const leftOffset = (itemStartDays / totalDays) * 100;
    const widthPercentage = (itemDuration / totalDays) * 100;
    
    return {
      left: `${leftOffset}%`,
      width: `${widthPercentage}%`,
    };
  };

  // Function to get the color based on progress
  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-blue-500";
    if (progress === 0) return "bg-red-500";
    return "bg-orange-500";
  };

  return (
    <div className="relative">
      {/* Time grid (vertical lines) */}
      <div className="absolute inset-0 flex">
        {allDays.map((day, index) => (
          <div 
            key={day.toISOString()} 
            className={`flex-1 border-r last:border-r-0 ${isFirstDayOfMonth(day) ? 'border-r-2 border-gray-300' : 'border-gray-100'}`}
          >
            {isFirstDayOfMonth(day) && (
              <div className="absolute top-0 text-xs text-gray-500" style={{ left: `${(index / allDays.length) * 100}%`, transform: 'translateX(-50%)' }}>
                {format(day, "MMM")}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Goals and milestones */}
      <div className="relative">
        {goals.map((goal) => (
          <div key={goal.id} className="relative">
            {/* Goal bar */}
            <div className="h-16 relative">
              <div 
                className={`absolute h-6 mt-5 rounded-md ${getProgressColor(goal.progress)}`}
                style={calculateItemPosition(goal.startDate, goal.endDate)}
              />
            </div>
            
            {/* Milestones (only if goal is expanded) */}
            {goal.expanded && goal.milestones.map((milestone) => (
              <div key={milestone.id} className="h-16 relative">
                <div 
                  className={`absolute h-6 mt-5 rounded-md ${getProgressColor(milestone.progress)}`}
                  style={calculateItemPosition(milestone.startDate, milestone.endDate)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineGrid;
