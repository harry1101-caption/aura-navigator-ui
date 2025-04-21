
export type TimeUnit = "weeks" | "months";

export interface Milestone {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress?: number; // Added progress property as optional
}

export interface Goal {
  id: string;
  title: string;
  owner: {
    name: string;
    avatar: string;
  };
  startDate: Date;
  endDate: Date;
  expanded: boolean;
  milestones: Milestone[];
  progress?: number; // Added progress property as optional
}
