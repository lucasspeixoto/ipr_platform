
export class IUser {
	static fromDataBase({ name, userId, email, photoUrl }) {
		return new IUser(name, userId, email, photoUrl);
	}

	constructor(
		public name: string,
		public userId: string,
		public email: string,
		public photoUrl: string,
	) {}
}
