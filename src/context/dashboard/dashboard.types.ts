export type DashboardContextType = {
  trainingsCount: number;
  getTotalTrainings: (idUser: string) => Promise<void>;
};
