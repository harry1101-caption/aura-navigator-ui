
export type TimeUnit = "weeks" | "months";

export interface Milestone {
  id: string;
  title: string;
  progress: number;
  startDate: Date;
  endDate: Date;
}

export interface Goal {
  id: string;
  title: string;
  owner: {
    name: string;
    avatar: string;
  };
  progress: number;
  startDate: Date;
  endDate: Date;
  expanded: boolean;
  milestones: Milestone[];
}
