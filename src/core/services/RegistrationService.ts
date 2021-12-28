import { IPersonal } from '@core/types/IPersonal';

import { firestore } from '@services/Firebase';

export const registerPersonalData = async (
  personal: IPersonal,
  userId: string
) => {

  /* Dados pessoais */
  const url = `users/${userId}`;
  const personalRef = firestore.doc(url);
  const addPersonal = { 'personal': { ...personal } };
  await personalRef.set(addPersonal, { merge: true });

  /* Dados de Processo */
  const processRef = firestore.doc(url);
  const addHasPersonal = { process: { hasPersonal: true } };
  await processRef.set(addHasPersonal, { merge: true });

};
