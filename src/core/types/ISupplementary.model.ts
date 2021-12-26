export class ISupplementary {
	static fromDataBase({
		marital_status,
		spouse_name,
		wedding_date,
		schooling,
		profession,
		father_name,
		mother_name,
	}) {
		return new ISupplementary(
			marital_status,
			spouse_name,
			wedding_date,
			schooling,
			profession,
			father_name,
			mother_name,
		);
	}

	constructor(
		public marital_status: string,
		public spouse_name: string,
		public wedding_date: string,
		public schooling: string,
		public profession: string,
		public father_name: string,
		public mother_name: string,
	) {}
}
