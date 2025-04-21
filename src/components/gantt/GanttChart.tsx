
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import TimelineHeader from "./TimelineHeader";
import GoalsList from "./GoalsList";
import TimelineGrid from "./TimelineGrid";
import { Goal, TimeUnit } from "@/types/gantt";
import { mockGoals } from "./mock-data";

const GanttChart = () => {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("weeks");
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate dates based on goals data
  const calculateDateRange = () => {
    let minDate = new Date();
    let maxDate = new Date();
    
    goals.forEach(goal => {
      if (goal.startDate < minDate) minDate = goal.startDate;
      if (goal.endDate > maxDate) maxDate = goal.endDate;
      
      goal.milestones.forEach(milestone => {
        if (milestone.startDate < minDate) minDate = milestone.startDate;
        if (milestone.endDate > maxDate) maxDate = milestone.endDate;
      });
    });
    
    // Add padding (2 weeks before and after)
    const paddedMinDate = new Date(minDate);
    paddedMinDate.setDate(paddedMinDate.getDate() - 14);
    
    const paddedMaxDate = new Date(maxDate);
    paddedMaxDate.setDate(paddedMaxDate.getDate() + 14);
    
    return { startDate: paddedMinDate, endDate: paddedMaxDate };
  };
  
  const { startDate, endDate } = calculateDateRange();
  
  // Scroll to center of timeline (where today is) on initial render
  useEffect(() => {
    if (timelineRef.current && containerRef.current) {
      // Calculate where "today" is in the timeline
      const today = new Date();
      const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysSinceStart = Math.round((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate the position as a percentage and scroll there
      const scrollPosition = (daysSinceStart / totalDays) * timelineRef.current.scrollWidth;
      
      // Center "today" in the viewport
      const centerPosition = Math.max(0, scrollPosition - containerRef.current.clientWidth / 2);
      timelineRef.current.scrollLeft = centerPosition;
    }
  }, [timeUnit, startDate, endDate]);
  
  const toggleGoalExpanded = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, expanded: !goal.expanded } 
        : goal
    ));
  };

  const scrollTimeline = (direction: "left" | "right") => {
    if (timelineRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      timelineRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  
  const scrollToToday = () => {
    if (timelineRef.current) {
      const today = new Date();
      const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysSinceStart = Math.round((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate the position as a percentage and scroll there
      const scrollPosition = (daysSinceStart / totalDays) * timelineRef.current.scrollWidth;
      timelineRef.current.scrollTo({ left: scrollPosition - 200, behavior: "smooth" });
    }
  };

  // Ensure the grid height exactly matches the list height for alignment
  const goalsCount = goals.reduce((acc, goal) => acc + 1 + (goal.expanded ? goal.milestones.length : 0), 0);
  const rowHeight = 64; // px (same as each row in the list/grid)
  const timelineHeight = Math.max(400, goalsCount * rowHeight); // minimum height of 400px

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      {/* Header with controls */}
      <div className="p-4 border-b flex flex-wrap justify-between items-center gap-4">
        <Tabs
          defaultValue="weeks"
          className="w-auto"
          onValueChange={(value: TimeUnit) => setTimeUnit(value)}
        >
          <TabsList>
            <TabsTrigger value="weeks">Weeks</TabsTrigger>
            <TabsTrigger value="months">Months</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => scrollTimeline("left")}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToToday}
          >
            <Calendar className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Today</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => scrollTimeline("right")}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>
      
      {/* Main content area with fixed height */}
      <div className="flex w-full pt-14" style={{height: `${timelineHeight}px`}}>
        {/* Left - Fixed Goals List */}
        <div className="bg-white border-r min-w-[280px] max-w-[350px] w-[30%] h-full sticky left-0 z-10 overflow-y-auto">
          <GoalsList goals={goals} onToggleExpand={toggleGoalExpanded} />
        </div>
        
        {/* Right - Timeline container */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-hidden"
        >
          <div
            ref={timelineRef}
            className="h-full overflow-x-auto overflow-y-auto"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="min-w-[900px]">
              {/* Timeline header that stays fixed at top while vertical scrolling */}
              <div className="sticky top-0 z-10 bg-white shadow-sm">
                <TimelineHeader
                  timeUnit={timeUnit}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              
              {/* Timeline grid that scrolls with the content */}
              <div className="relative">
                <TimelineGrid
                  goals={goals}
                  timeUnit={timeUnit}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;

