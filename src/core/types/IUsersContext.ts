import { IMember } from "./IMember";
import { IMemberDetail } from "./IMemberDetail";

export interface IUsersContext {
	isLoading: boolean;
	membersTotal: Partial<IMember>[] | undefined;
	membersDetails: IMemberDetail[] | undefined;
	activeMember: Partial<IMember> | undefined;
	deleteMember: (id: string) => Promise<void>;
}