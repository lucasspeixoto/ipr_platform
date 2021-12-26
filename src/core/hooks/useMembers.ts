import { useContext } from 'react';
import { MembersContext } from '@contexts/MembersContext';

export function useMembers() {
	const contextData = useContext(MembersContext);

	return contextData;
}
