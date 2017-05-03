export interface Movie{
	_id: any;
	Title: String;
	Year: String;
	Plot: String;
	Released: String;
	Runtime: String;
	Genre: String;
	imdbID: String;
	Poster: String;
	theatres?: {
		theatre: String
		dates: String[],
		timings: String[]
	}[];
};