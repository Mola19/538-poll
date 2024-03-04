export interface Poll {
	id: string,
	subgroup: string,
	sampleSize: number,
	population: string,
	grade: string,
	url: string|null,
	created_at: Date,
	startDate: Date,
	endDate: Date,
	pollster: string,
	pollsterRatingLink: null,
	partisan_pollster: string|null,
	answers: Answer[],
	type: string,
	seat_name: string|null,
	tracking: boolean,
	headToHead: boolean,
	sponsors: Sponsor[],
	internal: boolean,
	inAvg: boolean,
	politician: string,
	hasAvg: boolean,
	partisan: string,
	cycle: string,
	state: string,
	stage: string,
	district: string,
	subpopulation: string
}

export type Answer = {
	choice: string,
	pct: number,
	party: string,
	incumbent: boolean
}

export type Sponsor = {
	sponsor: string,
	partisan: string|null,
	internal: boolean,
	url: string|null,
	candidate: boolean
}

export interface Measurement {
	candidate: string,
	party: string,
	date: Date,
	pct: number,
	election: Date
}

// only intended for internal use
// types as returned by api
export interface InitialPoll {
	id: string,
	subgroup: string,
	sampleSize: string,
	population: string,
	grade: string,
	url: string | null,
	created_at: string,
	startDate: string,
	endDate: string,
	pollster: string,
	pollsterRatingLink: null,
	partisan_pollster: string | null,
	answers: InitialAnswer[],
	type: string,
	seat_name: string | null,
	tracking: boolean,
	headToHead: boolean,
	sponsors: Sponsor[],
	internal: boolean,
	inAvg: boolean,
	politician: string,
	hasAvg: boolean,
	partisan: string,
	cycle: string,
	state: string,
	stage: string,
	district: string,
	subpopulation: string
}

export type InitialAnswer = {
	choice: string,
	pct: string,
	party: string,
	incumbent: boolean
}

export interface InitialMeasurement {
	candidate: string,
	party: string,
	date: string,
	pct: number,
	lo: number | null,
	hi: number | null,
	election: string
}