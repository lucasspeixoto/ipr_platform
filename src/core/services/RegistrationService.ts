import { IEcclesiastical } from '@core/types/IEcclesiastical.model';
import { IPersonal } from '@core/types/IPersonal';

import { firebase, firestore } from '@services/Firebase';
import { ISupplementary } from '@core/types/ISupplementary.model';

const ProcessRefs = {
  personal: { hasPersonal: true },
  supplementary: { hasSupplementary: true },
  ecclesiastical: { hasEcclesiastical: true }
};

type Registration = IPersonal | ISupplementary | IEcclesiastical;
type DataRef = firebase.firestore.DocumentData;

export const registration = async (
  formData: Registration,
  userId: string,
  type: string
) => {
  /* Dados */
  const url = `users/${userId}`;
  const dataRef = firestore.doc(url);

  sendData(formData, dataRef, type);

  sendProcess(dataRef, type);
};

const sendProcess = async (dataRef: DataRef, type: string) => {
  /* Dados de Processo */
  const addProcess = { process: ProcessRefs[type] };
  await dataRef.set(addProcess, { merge: true });
};

const sendData = async (
  formData: Registration,
  dataRef: DataRef,
  type: string
) => {
  switch (type) {
    case 'personal':
      const personalAddData = { personal: { ...formData } };
      await dataRef.set(personalAddData, { merge: true });
      break;
    case 'supplementary':
      const SupplementaryAddData = { supplementary: { ...formData } };
      await dataRef.set(SupplementaryAddData, { merge: true });
      break;
    case 'ecclesiastical':
      const ecclesiasticalAddData = { ecclesiastical: { ...formData } };
      await dataRef.set(ecclesiasticalAddData, { merge: true });
      break;
    default:
      break;
  }
};

export const sendObservation = async (userId: string, observation: string) => {
  const url = `users/${userId}`;
  const dataRef = firestore.doc(url);

  const observationAddData = { observation: observation };
  await dataRef.set(observationAddData, { merge: true });
};
