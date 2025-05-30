
import { 
  differenceInDays, 
  eachDayOfInterval,
  isSameDay,
  isToday,
  isFirstDayOfMonth,
  isWeekend
} from "date-fns";
import { Goal, TimeUnit, Milestone } from "@/types/gantt";

// Helper to get today's date (without time part)
const getToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Determine the color class for a goal or milestone
function getBarColor(item: { endDate: Date; progress?: number }) {
  const today = getToday();
  const isOverdue = item.endDate < today && (item.progress ?? 0) < 100;

  if (isOverdue) return "bg-red-500";
  if ((item.progress ?? 0) >= 100) return "bg-green-500";
  if ((item.progress ?? 0) === 0) return "bg-gray-400";
  return "bg-blue-500";
}

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
    const dayWidth = 30; // Each day is 30px wide
    const left = itemStartDays * dayWidth;
    const width = Math.max(itemDuration * dayWidth, 30); // Minimum width of 30px for visibility
    
    return {
      left: `${left}px`,
      width: `${width}px`,
    };
  };

  return (
    <div className="relative" style={{ width: `${totalDays * 30}px`, minHeight: "400px" }}>
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
            </div>
          );
        })}
      </div>
      
      {/* Today indicator */}
      {allDays.some(day => isToday(day)) && (
        <div 
          className="absolute h-full border-l-2 border-blue-500 z-10"
          style={{
            left: `${differenceInDays(getToday(), startDate) * 30}px`,
            opacity: 0.7
          }}
        />
      )}
      
      {/* Goals and milestones as colored bars */}
      <div className="relative w-full">
        {goals.map((goal, goalIndex) => (
          <div key={goal.id} className="relative">
            {/* Goal bar */}
            <div className="h-16 relative">
              <div 
                className={`absolute h-8 mt-4 rounded-md ${getBarColor(goal)} opacity-90 hover:opacity-100 transition-opacity shadow-sm`}
                style={calculateItemPosition(goal.startDate, goal.endDate)}
              >
                <div className="absolute inset-0 flex items-center px-3 text-white text-xs font-medium overflow-hidden">
                  <span className="truncate">{goal.title}</span>
                </div>
              </div>
            </div>
            
            {/* Milestone bars (only if goal is expanded) */}
            {goal.expanded && goal.milestones.map((milestone, milestoneIndex) => (
              <div key={milestone.id} className="h-16 relative">
                <div
                  className={`absolute h-6 mt-5 rounded-md ${getBarColor(milestone)} opacity-90 hover:opacity-100 transition-opacity shadow-sm`}
                  style={calculateItemPosition(milestone.startDate, milestone.endDate)}
                >
                  <div className="absolute inset-0 flex items-center px-2 text-white text-xs font-medium overflow-hidden">
                    <span className="truncate">{milestone.title}</span>
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

