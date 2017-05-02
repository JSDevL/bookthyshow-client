export class Theatre{
	_id?: any;
	name: String;
	location: String;
	city: String;
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