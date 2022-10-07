const express = require('express')
const app = express()
const axios = require('axios')

// Catch all handler for all other request.
app.use('*', async (req,res) => {
  const apiKey = process.env.API_KEY || 'unknown'
  const ip = req.headers['x-forwarded-for'] || 'unknown'
  if (ip === 'unknown') {
    res.json({'error':'unknown ip'}).end()
  } else if (apiKey === 'unknown') {
    res.json({'error':'API_KEY not set'}).end()
  } else {
    const url = `https://api.freegeoip.app/json/${ip}?apikey=${apiKey}`
    const d = await axios.get(url)
    res.json(d.data).end()
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
