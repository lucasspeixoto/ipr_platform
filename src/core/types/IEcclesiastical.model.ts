export class IEcclesiastical {
	static fromDataBase({
		membership,
		craft,
		communities,
		interests,
		baptism,
		baptism_date,
		baptism_shepherd,
	}) {
		return new IEcclesiastical(
			membership,
			craft,
			communities,
			interests,
			baptism,
			baptism_date,
			baptism_shepherd,
		);
	}

	constructor(
		public membership: string,
		public craft: string,
		public communities: string[],
		public interests: string[],
		public baptism: string,
		public baptism_date: string,
		public baptism_shepherd: string,
	) {}
}
