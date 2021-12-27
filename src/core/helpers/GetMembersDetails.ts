import { IMember } from '@core/types/IMember';
import { IMemberDetail } from '@core/types/IMemberDetail';

export const getStatus = (member: Partial<IMember>): string => {
	if (member.personal && member.ecclesiastical && member.supplementary) {
		return 'completed';
	} else if (!member.process) {
		return 'pending';
	} else {
		return 'incomplete';
	}
};

export const getMembersDetails = (members: Partial<IMember>[]) => {
	
	const lisfOfMembersDetails: IMemberDetail[] = [];
	members.forEach(member => {
		let memberDetail: IMemberDetail = {
			id: member?.auth?.userId || null,
			photoUrl: member?.auth?.photoUrl || null,
			name: member?.auth?.name || null,
			city: member?.personal?.city || null,
			birth_date: member?.personal?.birth_date || null,
			email: member?.personal?.email || null,
			membership: member?.ecclesiastical?.membership || null,
			interests: member?.ecclesiastical?.interests || null,
			status: getStatus(member),
		};
		lisfOfMembersDetails.push(memberDetail);
	});

	return lisfOfMembersDetails;
};
