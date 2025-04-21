
import { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  // Remove the Today button functionality as requested

  // Ensure the grid height exactly matches the list height for alignment
  const goalsCount = goals.reduce((acc, goal) => acc + 1 + (goal.expanded ? goal.milestones.length : 0), 0);
  const rowHeight = 64; // px (same as each row in the list/grid)
  const timelineHeight = Math.max(400, goalsCount * rowHeight); // minimum height of 400px

  return (
    <div className="border rounded-lg bg-white overflow-hidden mt-4">
      {/* Remove top white spacing, so no extra margin/padding here */}

      {/* Goals and Timeline Labels */}
      <div className="flex border-b">
        {/* Left goals list column - no title */}
        <div className="bg-gray-50 min-w-[352px] max-w-[352px] w-[352px] py-3 px-4 font-medium text-gray-700 text-sm border-r">
          {/* Removed "Goals" title here as requested */}
        </div>

        {/* Timeline area */}
        <div className="flex-1 bg-gray-50">
          {/* Timeline header with hidden days header */}
          <TimelineHeader
            timeUnit={timeUnit}
            startDate={startDate}
            endDate={endDate}
            hideDaysHeader
          />
        </div>
      </div>

      {/* Main content area with fixed height */}
      <div className="flex w-full relative" style={{ height: `${timelineHeight}px` }}>
        {/* Left - Fixed Goals List */}
        <div className="bg-white border-r min-w-[352px] max-w-[352px] w-[352px] h-full sticky left-0 z-10 overflow-y-auto">
          <GoalsList goals={goals} onToggleExpand={toggleGoalExpanded} />
        </div>

        {/* Right - Timeline container */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden"
          style={{ position: "relative" }}
        >
          <div
            ref={timelineRef}
            className="h-full overflow-x-auto overflow-y-auto"
            style={{
              WebkitOverflowScrolling: "touch",
              position: "relative"
            }}
          >
            <div className="min-w-[900px]">
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
            {/* Floating bottom-right controls: Tabs Weeks/Months */}
            <div
              className="fixed z-20 flex flex-row items-center gap-2 p-2 rounded-lg bg-white/90 border shadow-xl"
              style={{
                bottom: "28px",
                right: "40px"
              }}
            >
              <Tabs
                value={timeUnit}
                className="w-auto"
                onValueChange={(value: TimeUnit) => setTimeUnit(value)}
              >
                <TabsList>
                  <TabsTrigger value="weeks">Weeks</TabsTrigger>
                  <TabsTrigger value="months">Months</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;

