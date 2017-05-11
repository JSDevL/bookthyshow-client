export class Theatre{
	_id?: String;
	name: String;
	location: String;
	city: any;
	movies?: {
		movie: String
		dates: String[],
		timings: String[]
	}[];

	constructor(){
		this.name = '';
		this.location = '';
		this.city = '';
		this.movies = [];
	}
};