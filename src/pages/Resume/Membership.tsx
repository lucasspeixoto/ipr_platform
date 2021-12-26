import { Card } from '@mui/material';
import React, { useMemo } from 'react';

import { MembersTable } from './MembershipTable';
import { useMembers } from '@hooks/useMembers';

export const Membership: React.FC = () => {
	const { membersDetails } = useMembers();

	const members = useMemo(() => {
		let listOfMembersDetail = [];
		if (membersDetails) {
			membersDetails.forEach(member => {
				listOfMembersDetail.push(member);
			});
		}

		return listOfMembersDetail;
	}, [membersDetails]);

	return (
		<Card>
			<MembersTable members={members} />
		</Card>
	);
};
