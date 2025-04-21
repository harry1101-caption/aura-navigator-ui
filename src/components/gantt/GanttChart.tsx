
import { useState, useRef, useLayoutEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import TimelineHeader from "./TimelineHeader";
import GoalsList from "./GoalsList";
import TimelineGrid from "./TimelineGrid";
import { Goal, TimeUnit } from "@/types/gantt";
import { mockGoals } from "./mock-data";

const GanttChart = () => {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("weeks");
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Scroll to beginning of timeline (optional: you could center "now" here in the future)
  useLayoutEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollLeft = 0;
    }
  }, [timeUnit]);

  const toggleGoalExpanded = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, expanded: !goal.expanded } 
        : goal
    ));
  };

  const startDate = new Date(2025, 3, 1);
  const endDate = new Date(2025, 5, 30);

  // Ensure the grid height exactly matches the list height for alignment
  const goalsCount = goals.reduce((acc, goal) => acc + 1 + (goal.expanded ? goal.milestones.length : 0), 0);
  const rowHeight = 64; // px (same as each row in the list/grid)
  const timelineHeight = goalsCount * rowHeight;

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
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
        <div className="flex-1 min-w-0 w-full sm:w-auto sm:ml-4" />
      </div>
      <div className="flex w-full" style={{height: timelineHeight + 2 /* px for borders */}}>
        {/* Left - Fixed Goals List */}
        <div className="bg-white border-r min-w-[300px] max-w-[350px] w-1/3 h-full sticky left-0 z-10">
          <GoalsList goals={goals} onToggleExpand={toggleGoalExpanded} />
        </div>
        {/* Right - Timeline: header + grid, both scroll together */}
        <div className="flex-1 w-0 h-full">
          <div
            ref={scrollerRef}
            className="h-full overflow-x-auto overflow-y-hidden"
            style={{
              // Make it possible to scroll the entire timeline horizontally
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="min-w-[900px]">
              {/* TimelineHeader and TimelineGrid are now stacked and scroll together */}
              <TimelineHeader
                timeUnit={timeUnit}
                startDate={startDate}
                endDate={endDate}
              />
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
  );
};

export default GanttChart;

