
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <Tabs defaultValue="weeks" className="w-auto">
          <TabsList>
            <TabsTrigger 
              value="weeks" 
              onClick={() => setTimeUnit("weeks")}
            >
              Weeks
            </TabsTrigger>
            <TabsTrigger 
              value="months" 
              onClick={() => setTimeUnit("months")}
            >
              Months
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex">
        <div className="w-1/3 min-w-[350px] border-r">
          <GoalsList goals={goals} onToggleExpand={toggleGoalExpanded} />
        </div>
        <div className="w-2/3 overflow-x-auto">
          <TimelineHeader timeUnit={timeUnit} startDate={new Date(2025, 3, 1)} endDate={new Date(2025, 5, 30)} />
          <TimelineGrid 
            goals={goals} 
            timeUnit={timeUnit} 
            startDate={new Date(2025, 3, 1)} 
            endDate={new Date(2025, 5, 30)} 
          />
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
