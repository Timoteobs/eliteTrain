export interface Student {
  email: string;
  name: string;
  phone: string;
  type: string;
  uid: string;
  idPersonal: string;
}

export type VinculationContextType = {
  students: Student[];
  getStudent: (email: string) => Promise<void>;
  setVinculation: (student: Student) => Promise<boolean>;
};
