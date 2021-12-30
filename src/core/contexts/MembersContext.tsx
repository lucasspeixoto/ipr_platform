import { createContext, useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';

import { firestore } from '@services/Firebase';
import { IMemberDetail } from '@core/types/IMemberDetail';
import { IMember } from '@core/types/IMember';
import { getMembersDetails } from '@core/helpers/GetMembersDetails';
import { IUsersContext } from '@core/types/IUsersContext';

export const MembersContext = createContext({} as IUsersContext);

export const MembersContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [membersTotal, setMembersTotal] =
    useState<Partial<IMember>[]>(undefined);
  const [membersDetails, setMembersDetails] =
    useState<IMemberDetail[]>(undefined);
  const [activeMember, setActiveMember] = useState<Partial<IMember>>(undefined);
  const [selectedMember, setSelectedMember] =
    useState<Partial<IMember>>(undefined);

  const { user, isLogged } = useAuth();

  const getSelectedMember = async (userId: string) => {
    const result = firestore.collection('users');

    if (user) {
      result.onSnapshot((value) => {
        if (value) {
          value.forEach((doc) => {
            const item: Partial<IMember> = doc.data();
            if (item.auth.userId === userId) {
              setSelectedMember(item);
            }
          });
        }
      });
    }
  };

  const membersDetailsHandler = (listOfMembers: Partial<IMember>[]) => {
    setMembersTotal(listOfMembers);
    if (listOfMembers.length >= 1) {
      const lisfOfMembersDetails = getMembersDetails(listOfMembers);
      setMembersDetails(lisfOfMembersDetails);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let listOfMembers: Partial<IMember>[] = [];
    if (user && isLogged) {
      const result = firestore.collection('users');

      result.onSnapshot((value) => {
        if (value) {
          value.forEach((doc) => {
            const item: Partial<IMember> = doc.data();
            if (item.auth.userId === user.userId) {
              setActiveMember(item);
            }
            listOfMembers.push(item);
          });
        }

        membersDetailsHandler(listOfMembers);
      });

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user, isLoading, isLogged]);

  const deleteMember = async (userId: string) => {
    setIsLoading(true);
    await firestore.doc(`users/${userId}/`).delete();
    setIsLoading(false);
  };

  return (
    <MembersContext.Provider
      value={{
        isLoading,
        membersTotal,
        membersDetails,
        activeMember,
        deleteMember,
        selectedMember,
        getSelectedMember
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};
