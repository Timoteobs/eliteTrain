export interface User {
  uId: string;
  name: string;
  email: string;
  phone: string;
  type: "P" | "A" | null;
}

export const InitialValueUSer: User = {
  uId: "",
  name: "",
  email: "",
  phone: "",
  type: null,
};

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
  phone: string;
  type: "P" | "A" | null;
}

export type AuthContextType = {
  dataUser: User;
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
};
