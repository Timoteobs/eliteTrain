import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  Exercise,
  NewSection,
  NewTrainingSheetParams,
  Sections,
  TrainingSheetContextType,
  TrainingSheetList,
} from "./trainingSheet.types";
import useLoading from "@hooks/useLoading";
import { useToast } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { Collections } from "@utils/Collections";
import Toast from "@components/Toast";
import useAuth from "@hooks/useAuth";

export const TrainingSheetContext =
  createContext<TrainingSheetContextType | null>(null);

type Props = {
  children: ReactNode;
};

const TrainingSheetProvider = ({ children }: Props) => {
  const [listTrainingSheet, setListTrainingSheet] = useState<
    TrainingSheetList[]
  >([]);
  const [idTrainingSheetSelected, setIdTrainingSheetSelected] =
    useState<string>("");
  const [listSections, setListSections] = useState<Sections[]>([]);
  const [sectionSelected, setSectionSelected] = useState<string>("");
  const [listExercise, setListExercise] = useState<Exercise[]>([]);
  const [idSectionForDelete, setIdSectionForDelete] = useState<string>("");

  const { onClose, onOpen } = useLoading();
  const { dataUser } = useAuth();
  const toast = useToast();

  const newTrainingSheet = async (params: NewTrainingSheetParams) => {
    try {
      onOpen();

      await firestore().collection(Collections.trainingSheet).add({
        name: params.name,
        idUser: params.idUser,
        created: new Date(),
      });

      toast.show({
        render: () => (
          <Toast
            message="Ficha criada com sucesso!"
            title="Criar ficha"
            type="success"
          />
        ),
      });

      await getAllTrainingSheet();

      return true;
    } catch (error) {
      console.error(error);

      toast.show({
        render: () => (
          <Toast
            message="Erro ao tentar criar nova ficha de treino, tente novamente!"
            title="Criar ficha"
            type="error"
          />
        ),
      });

      return false;
    } finally {
      onClose();
    }
  };

  const getAllTrainingSheet = async () => {
    try {
      onOpen();

      const response = await firestore()
        .collection(Collections.trainingSheet)
        .where("idUser", "==", dataUser.uId)
        .orderBy("created", "desc")
        .get();

      var data: any = [];

      response.docs.map((doc) => {
        data.push({
          created: doc.data().created,
          idUser: doc.data().idUser,
          uId: doc.id,
          name: doc.data().name,
        });
      });

      setListTrainingSheet(data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const selectIdTrainingSheetSelected = (id: string) => {
    setIdTrainingSheetSelected(id);
  };

  const newSection = async (params: NewSection) => {
    try {
      onOpen();

      await firestore().collection(Collections.section).add({
        name: params.name,
        idTrainingSheet: idTrainingSheetSelected,
        created: new Date(),
      });

      toast.show({
        render: () => (
          <Toast
            message="Seção criada com sucesso!"
            title="Criar seção"
            type="success"
          />
        ),
      });

      await getAllSections();

      return true;
    } catch (error) {
      console.error(error);

      toast.show({
        render: () => (
          <Toast
            message="Erro ao tentar criar nova seção de treino, tente novamente!"
            title="Criar ficha"
            type="error"
          />
        ),
      });

      return false;
    } finally {
      onClose();
    }
  };

  const getAllSections = async () => {
    try {
      onOpen();
      clearExercise();

      const response = await firestore()
        .collection(Collections.section)
        .where("idTrainingSheet", "==", idTrainingSheetSelected)
        .orderBy("created", "asc")
        .get();

      var data: any[] = [];

      response.docs.map((doc) => {
        data.push({
          created: doc.data().created,
          idTrainingSheet: doc.data().idTrainingSheet,
          uid: doc.id,
          name: doc.data().name,
        });
      });

      if (data.length > 0) {
        setSectionSelected(data[0].uid);
        getAllExercisesBySectionId(data[0].uid);
      }

      setListSections(data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const selectedSection = (id: string) => {
    setSectionSelected(id);
  };

  const newExerciseInSection = async (params: Exercise) => {
    try {
      onOpen();

      await firestore().collection(Collections.exercises).add({
        exerciseName: params.exerciseName,
        repetitions: params.repetitions,
        restTime: params.restTime,
        weight: params.weight,
        observation: params.observation,
        idSectionSelected: sectionSelected,
        series: params.series,
        created: new Date(),
        order: params.order,
      });

      toast.show({
        render: () => (
          <Toast
            message="Exercicio adicionado com sucesso!"
            title="Novo exercício"
            type="success"
          />
        ),
      });

      await getAllSections();

      return true;
    } catch (error) {
      console.error(error);

      toast.show({
        render: () => (
          <Toast
            message="Erro ao adicionar exercício, tente novamente!"
            title="Novo exercício"
            type="error"
          />
        ),
      });

      return false;
    } finally {
      onClose();
    }
  };

  const getAllExercisesBySectionId = async (sectionId: string) => {
    try {
      onOpen();

      const response = await firestore()
        .collection(Collections.exercises)
        .where("idSectionSelected", "==", sectionId)
        .orderBy("order", "desc")
        .get();

      var data: Exercise[] = [];

      response.docs.map((doc) => {
        data.push({
          exerciseName: doc.data().exerciseName,
          repetitions: doc.data().repetitions,
          restTime: doc.data().restTime,
          created: doc.data().created,
          observation: doc.data().observation,
          weight: doc.data().weight,
          uid: doc.id,
          series: doc.data().series,
          order: doc.data().order,
        });
      });

      setListExercise(data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const clearExercise = () => {
    setListExercise([]);
  };

  const deleteExercise = async (idExercise: string) => {
    try {
      onOpen();

      await firestore()
        .collection(Collections.exercises)
        .doc(idExercise)
        .delete();

      toast.show({
        render: () => (
          <Toast
            message="Exercicio removido com sucesso!"
            title="Excluir exercício"
            type="success"
          />
        ),
      });

      await getAllExercisesBySectionId(sectionSelected);

      return true;
    } catch (error) {
      console.error(error);

      toast.show({
        render: () => (
          <Toast
            message="Erro ao excluir exercício, tente novamente!"
            title="Excluir exercício"
            type="error"
          />
        ),
      });
      return false;
    } finally {
      onClose();
    }
  };

  const editExercise = async (exercise: Exercise) => {
    try {
      onOpen();

      console.log(exercise);

      await firestore()
        .collection(Collections.exercises)
        .doc(exercise.uid)
        .update({
          ...exercise,
        });

      toast.show({
        render: () => (
          <Toast
            message="Exercicio alterado com sucesso!"
            title="Alterar exercício"
            type="success"
          />
        ),
      });

      await getAllExercisesBySectionId(sectionSelected);

      return true;
    } catch (error) {
      console.error(error);

      toast.show({
        render: () => (
          <Toast
            message="Erro ao alterar exercício, tente novamente!"
            title="Alterar exercício"
            type="error"
          />
        ),
      });
      return false;
    } finally {
      onClose();
    }
  };

  const selectIdSectionForDelete = (idSection: string) => {
    setIdSectionForDelete(idSection);
  };

  const deleteSection = async () => {
    try {
      onOpen();

      const response = await firestore()
        .collection(Collections.exercises)
        .where("idSectionSelected", "==", idSectionForDelete)
        .get();

      response.forEach(async (doc) => {
        await firestore()
          .collection(Collections.exercises)
          .doc(doc.id)
          .delete();
      });

      await firestore()
        .collection(Collections.section)
        .doc(idSectionForDelete)
        .delete();

      toast.show({
        render: () => (
          <Toast
            message="Seção removida com sucesso!"
            title="Excluir seção"
            type="success"
          />
        ),
      });

      await getAllSections();

      return true;
    } catch (error) {
      console.error(error);

      toast.show({
        render: () => (
          <Toast
            message="Erro ao excluir seção, tente novamente!"
            title="Excluir seção"
            type="error"
          />
        ),
      });
      return false;
    } finally {
      onClose();
    }
  };

  return (
    <TrainingSheetContext.Provider
      value={{
        idTrainingSheetSelected,
        listTrainingSheet,
        listSections,
        sectionSelected,
        listExercise,
        idSectionForDelete,
        newTrainingSheet,
        getAllTrainingSheet,
        selectIdTrainingSheetSelected,
        newSection,
        getAllSections,
        selectedSection,
        newExerciseInSection,
        getAllExercisesBySectionId,
        clearExercise,
        deleteExercise,
        editExercise,
        selectIdSectionForDelete,
        deleteSection,
      }}
    >
      {children}
    </TrainingSheetContext.Provider>
  );
};

export { TrainingSheetProvider };
