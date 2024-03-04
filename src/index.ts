import { Poll, InitialPoll, Answer, Measurement, InitialMeasurement } from "./types.js"
import { types, codes } from "./consts.js"

/**
 * This function returns all polling data for the given requirements
 * Note: Giving no options will return all polls (a few 10000), which takes a few seconds
 * @param type The type of poll 
 * @param cycle The year the related election will be in (only even years)
 * @param entity The entity name or code (state, "national", person or institution based on context)
 * @returns List of all polls for the given requirements
 */
export async function fetchPolls(type?: string, cycle?: number, entity?: string): Promise<Poll[]> {
	if (typeof entity == "string" && entity.length == 2) {
		if (entity.toUpperCase() in codes) {
			entity = codes[entity.toUpperCase() as keyof typeof codes]
		}
	}

	let url = "https://projects.fivethirtyeight.com/polls/"

	if (type) url += type + "/"
	if (cycle) url += cycle.toString() + "/"
	if (entity) url += entity + "/"

	url += "polls.json" 

	let res = await fetch(url)

	if (res.status == 404) return []

	let polls: Poll[] = (await res.json() as InitialPoll[]).map((poll_el: InitialPoll) => {
		let answers: Answer[] = []

		for (let [i, answer] of poll_el.answers.entries()) {
			answers[i] = {
				...answer,
				pct: Number(answer.pct)
			}
		}

		return {...poll_el,
			sampleSize: Number(poll_el.sampleSize),
			created_at: new Date(poll_el.created_at),
			startDate: new Date(poll_el.startDate),
			endDate: new Date(poll_el.endDate),
			answers
		} as Poll
	})

	return polls
}

/**
 * This function returns the polling average for a race
 * Note: The race must be uniquely identified e.g. generic-ballot 2024, or senate 2022 nevada
 * and most races don't actually have this feature
 * @param type The type of poll 
 * @param cycle The year the related election will be in (only even years)
 * @param entity The entity name or code (state, person or institution based on context)
 * @returns 
 */
export async function fetchPollingAverage(type: string, cycle?: number, entity?: string): Promise<Measurement[]> {
	if (typeof entity == "string" && entity.length == 2) {
		if (entity.toUpperCase() in codes) {
			entity = codes[entity.toUpperCase() as keyof typeof codes]
		}
	}

	let url = "https://projects.fivethirtyeight.com/polls/"

	if (type) url += type + "/"
	if (cycle) url += cycle.toString() + "/"
	if (entity) url += entity + "/"

	url += "polling-average.json" 

	let res = await fetch(url)

	if (res.status == 404) return []

	let race: Measurement[] = (await res.json() as InitialMeasurement[]).map((measure: InitialMeasurement) => {
		return {...measure,
			date: new Date(measure.date),
			election: new Date(measure.election)
		} as Measurement
	})

	return race
}

export { types, codes }
