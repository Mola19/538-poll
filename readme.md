# 538-polls
This is a small esm library to get polling data from [538](https://projects.fivethirtyeight.com/polls/).
Currently it copies the api structure and only changes types for convenience (e.g. parsing dates from date strings)

## Usage

```js
import { fetchPolls } from "538-polls"

let polls = await fetchPolls("senate", 2022, "nevada")
let avg = await fetchPollingAverage("senate", 2022, "nevada")
```

## Poll Types:
  
| type                                                            | cycle | entity                   |
| --------------------------------------------------------------- | ----- | ------------------------ |
| approval<br>favorability                                        | ❌     | institution<br>person    |
| generic-ballot                                                  | ✔     | ❌<br>(always dem vs rep) |
| governor<br>house<br>senate                                     | ✔     | state                    |
| governor-recall                                                 | ❌     | state                    |
| president-general<br>president-primary-d<br>president-primary-r | ✔     | state<br>"national"      |
