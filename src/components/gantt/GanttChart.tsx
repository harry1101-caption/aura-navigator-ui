
import { useState } from "react";
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
  
  const toggleGoalExpanded = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, expanded: !goal.expanded } 
        : goal
    ));
  };

  const startDate = new Date(2025, 3, 1);
  const endDate = new Date(2025, 5, 30);

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
      <div className="flex">
        {/* Left Goals List (sticky, does not scroll horizontally) */}
        <div className="w-1/3 min-w-[350px] border-r bg-white" style={{zIndex: 10}}>
          <GoalsList goals={goals} onToggleExpand={toggleGoalExpanded} />
        </div>
        {/* Timeline Header and Grid in a synced horizontal ScrollArea */}
        <div className="w-2/3 overflow-x-auto">
          <ScrollArea orientation="horizontal" className="h-full">
            {/* Sticky header */}
            <div>
              <TimelineHeader timeUnit={timeUnit} startDate={startDate} endDate={endDate} />
            </div>
            {/* Timeline Grid */}
            <TimelineGrid 
              goals={goals} 
              timeUnit={timeUnit} 
              startDate={startDate} 
              endDate={endDate} 
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
