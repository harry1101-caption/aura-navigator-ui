
import { format, eachWeekOfInterval, eachMonthOfInterval, startOfMonth, endOfMonth, addDays, startOfWeek, endOfWeek, isToday } from "date-fns";
import { TimeUnit } from "@/types/gantt";

interface TimelineHeaderProps {
  timeUnit: TimeUnit;
  startDate: Date;
  endDate: Date;
  hideDaysHeader?: boolean;
}

const TimelineHeader = ({ timeUnit, startDate, endDate, hideDaysHeader = false }: TimelineHeaderProps) => {
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
          
          // Check if this month contains today
          const today = new Date();
          const containsToday = 
            today >= monthStart && 
            today <= monthEnd;
          
          return (
            <div 
              key={month.toString()} 
              className={`text-center py-2 font-medium ${containsToday ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
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
        {weeks.map((week) => {
          const weekEnd = endOfWeek(week, { weekStartsOn: 1 });
          const today = new Date();
          const containsToday = today >= week && today <= weekEnd;
          
          return (
            <div 
              key={week.toString()} 
              className={`text-center py-2 font-medium border-r last:border-r-0 ${
                containsToday ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
              style={{ width: "210px", minWidth: "210px" }} // 7 days * 30px
            >
              {format(week, "MMM d")} - {format(weekEnd, "MMM d")}
            </div>
          );
        })}
      </div>
    );
  };

  // Add a day header for more precise date indicators if not hidden
  const renderDaysHeader = () => {
    if (hideDaysHeader) {
      return null;
    }
    const daysArray = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      daysArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return (
      <div className="flex border-b">
        {daysArray.map((day) => {
          const isTodayDate = isToday(day);
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          
          return (
            <div 
              key={day.toString()}
              className={`text-center py-1 text-xs font-medium border-r last:border-r-0 ${
                isTodayDate ? 'bg-blue-100 text-blue-700 font-bold' : 
                isWeekend ? 'bg-gray-50 text-gray-400' : 'text-gray-500'
              }`}
              style={{ width: "30px", minWidth: "30px" }}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full select-none">
      {timeUnit === "months" ? renderMonthsHeader() : renderWeeksHeader()}
      {renderDaysHeader()} {/* Show days if not hidden */}
    </div>
  );
};

export default TimelineHeader;
