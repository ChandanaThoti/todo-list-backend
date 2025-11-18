export type Task = {
  Id: string;
  Name: string;
  Description: string;
  Status: Status;
  Priority: Priority;
  Deadline: string;
};

export enum Status {
  InProgress = "In Progress",
  Pending = "Pending",
  Completed = "Completed",
}

export enum Priority {
  High = "High priority",
  Medium = "Medium priority",
  Low = "Low priority",
}
