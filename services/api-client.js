import axios from "axios"

export default axios.create({
    baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
})

export const weatherApiKey = "E2HME96KTLT2WMKFAXXY4CTDT";