
import { format, eachWeekOfInterval, eachMonthOfInterval, startOfMonth, endOfMonth, addDays } from "date-fns";
import { TimeUnit } from "@/types/gantt";

interface TimelineHeaderProps {
  timeUnit: TimeUnit;
  startDate: Date;
  endDate: Date;
}

const TimelineHeader = ({ timeUnit, startDate, endDate }: TimelineHeaderProps) => {
  const renderMonthsHeader = () => {
    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    
    return (
      <div className="flex border-b">
        {months.map((month, index) => {
          // Calculate how many days are in this month and within our range
          const monthStart = index === 0 ? startDate : startOfMonth(month);
          const monthEnd = index === months.length - 1 ? endDate : endOfMonth(month);
          const daysInMonth = Math.round((monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          
          // Each cell width is calculated based on total days
          const cellWidth = `${daysInMonth * 30}px`;
          
          return (
            <div 
              key={month.toString()} 
              className="text-center py-2 font-medium text-gray-600 bg-gray-100"
              style={{ width: cellWidth, minWidth: cellWidth }}
            >
              {format(month, "MMMM yyyy")}
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderWeeksHeader = () => {
    const weeks = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 } // Monday is the start of the week
    );
    
    return (
      <div className="flex border-b">
        {weeks.map((week, index) => {
          const weekEnd = addDays(week, 6);
          return (
            <div 
              key={week.toString()} 
              className="text-center py-2 font-medium text-gray-600 border-r last:border-r-0 bg-gray-100"
              style={{ width: "210px", minWidth: "210px" }} // 7 days * 30px
            >
              {format(week, "MMM d")} - {format(weekEnd, "MMM d")}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-10">
      {timeUnit === "months" ? renderMonthsHeader() : renderWeeksHeader()}
    </div>
  );
};

export default TimelineHeader;
