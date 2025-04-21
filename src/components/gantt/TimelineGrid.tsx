
import { 
  differenceInDays, 
  eachDayOfInterval,
  isSameDay,
  isToday,
  format,
  startOfMonth,
  isFirstDayOfMonth,
  isWeekend
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
  const totalDays = differenceInDays(endDate, startDate) + 1;
  
  // Calculate position for an item (goal or milestone)
  const calculateItemPosition = (itemStart: Date, itemEnd: Date) => {
    const itemStartDays = Math.max(0, differenceInDays(itemStart, startDate));
    const itemDuration = Math.min(
      differenceInDays(itemEnd, itemStart) + 1,
      differenceInDays(endDate, itemStart) + 1
    );
    
    // Calculate position as exact pixel values to ensure alignment with header
    const dayWidth = 30; // Each day is 30px wide
    const left = itemStartDays * dayWidth;
    const width = itemDuration * dayWidth;
    
    return {
      left: `${left}px`,
      width: `${width}px`,
    };
  };

  // Function to get the color based on progress
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 33) return "bg-blue-500";
    return "bg-red-500";
  };

  return (
    <div className="relative" style={{ width: `${totalDays * 30}px`, height: "100%" }}>
      {/* Time grid (vertical lines) */}
      <div className="absolute inset-0 flex">
        {allDays.map((day, index) => {
          const isCurrentDay = isToday(day);
          const dayIsWeekend = isWeekend(day);
          
          return (
            <div 
              key={day.toISOString()} 
              className={`h-full w-[30px] ${
                isFirstDayOfMonth(day) 
                  ? 'border-l-2 border-gray-300' 
                  : isCurrentDay
                    ? 'border-l-2 border-blue-400 bg-blue-50/30'
                    : dayIsWeekend
                      ? 'border-l border-gray-100 bg-gray-50/50'
                      : 'border-l border-gray-100'
              }`}
            >
              {isFirstDayOfMonth(day) && timeUnit === "weeks" && (
                <div className="absolute top-0 text-xs text-gray-500" style={{ left: `${index * 30}px` }}>
                  {format(day, "MMM")}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Today indicator */}
      {allDays.some(day => isToday(day)) && (
        <div 
          className="absolute h-full border-l-2 border-blue-500 z-10"
          style={{
            left: `${differenceInDays(new Date(), startDate) * 30}px`,
            opacity: 0.7
          }}
        />
      )}
      
      {/* Goals and milestones */}
      <div className="relative">
        {goals.map((goal) => (
          <div key={goal.id} className="relative">
            {/* Goal bar */}
            <div className="h-16 relative">
              <div 
                className={`absolute h-8 mt-4 rounded-md opacity-90 hover:opacity-100 transition-opacity shadow-sm`}
                style={{
                  ...calculateItemPosition(goal.startDate, goal.endDate),
                  background: `linear-gradient(to right, ${getProgressColor(goal.progress)}, ${getProgressColor(Math.min(100, goal.progress + 20))})`,
                }}
              >
                <div 
                  className="absolute inset-0 flex items-center px-3 text-white text-xs font-medium overflow-hidden"
                >
                  <span className="truncate">{goal.title}</span>
                  <span className="ml-auto pl-2 font-bold">{goal.progress}%</span>
                </div>
              </div>
            </div>
            
            {/* Milestones (only if goal is expanded) */}
            {goal.expanded && goal.milestones.map((milestone) => (
              <div key={milestone.id} className="h-16 relative">
                <div 
                  className={`absolute h-6 mt-5 rounded-md opacity-90 hover:opacity-100 transition-opacity shadow-sm`}
                  style={{
                    ...calculateItemPosition(milestone.startDate, milestone.endDate),
                    background: `linear-gradient(to right, ${getProgressColor(milestone.progress)}, ${getProgressColor(Math.min(100, milestone.progress + 15))})`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center px-2 text-white text-xs font-medium overflow-hidden">
                    <span className="truncate">{milestone.title}</span>
                    <span className="ml-auto pl-2 font-bold">{milestone.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineGrid;
