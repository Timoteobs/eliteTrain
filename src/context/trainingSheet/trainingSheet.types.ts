export interface TrainingSheetList {
  uId: string;
  name: string;
  idUser: string;
}

export interface NewTrainingSheetParams {
  name: string;
  idUser: string;
}

export interface NewSection {
  name: string;
}

export interface Sections {
  created: string;
  idTrainingSheet: string;
  name: string;
  uid: string;
}

export interface Exercise {
  exerciseName: string;
  repetitions: number;
  restTime: number;
  weight?: number;
  observation?: string;
  created?: string;
  uid?: string;
  series: number;
  order: number;
}

export type TrainingSheetContextType = {
  listTrainingSheet: TrainingSheetList[];
  idTrainingSheetSelected: string;
  listSections: Sections[];
  sectionSelected: string;
  listExercise: Exercise[];
  idSectionForDelete: string;
  newTrainingSheet: (params: NewTrainingSheetParams) => Promise<boolean>;
  getAllTrainingSheet: () => Promise<void>;
  selectIdTrainingSheetSelected: (id: string) => void;
  newSection: (params: NewSection) => Promise<boolean>;
  getAllSections: () => Promise<void>;
  selectedSection: (id: string) => void;
  newExerciseInSection: (params: Exercise) => Promise<boolean>;
  getAllExercisesBySectionId: (sectionId: string) => Promise<void>;
  clearExercise: () => void;
  deleteExercise: (idExercise: string) => Promise<boolean>;
  editExercise: (exercise: Exercise) => Promise<boolean>;
  deleteSection: () => Promise<boolean>;
  selectIdSectionForDelete: (idSection: string) => void;
};
