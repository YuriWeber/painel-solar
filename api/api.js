const axios = require("axios")

const api = axios.create({
  baseURL: 'https://power.larc.nasa.gov/api/temporal/climatology/'
})

module.exports = api