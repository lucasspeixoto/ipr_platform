import { IEcclesiastical } from './IEcclesiastical.model';
import { IPersonal } from './IPersonal';
import { IUser } from './IUser.model';
import { ISupplementary } from './ISupplementary.model';
import { IProcess } from './IProcess.model';

export class IMember {
	static fromDataBase({
		auth,
		personal,
		supplementary,
		ecclesiastical,
		process,
		observation,
	}) {
		return new IMember(
			auth,
			personal,
			supplementary,
			ecclesiastical,
			process,
			observation,
		);
	}

	constructor(
		public auth: IUser,
		public personal: IPersonal,
		public supplementary: ISupplementary,
		public ecclesiastical: IEcclesiastical,
		public process: IProcess,
		public observation?: string,
	) {}
}
