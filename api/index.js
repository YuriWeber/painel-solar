const express = require("express")
const cors = require("cors");
const solarPanel = require("./solarPanel")

const app = express()

app.use(express.json())

app.use(cors())

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening port " + port)
})

async function getDataResult(data) {
    var result = {}
    const kwhValue = data.kwhValue
    const monthlyConsumption = data.monthlyConsumption
    const limitedArea = data.limitedArea
    const panelSize = 1.91 // m²
    const panelPotential = 330 // Wp
    const panelWeight = 25 // kg
    var irradianceAvg = 5
    
    if (data.lat && data.lng) {
      try {
        irradianceAvg = await solarPanel.getIrradianceAvg(data.lat, data.lng);
      } catch (err) {
        result.message = err
      }
    }

    const monthlyProduction = solarPanel.getMonthlyProduction(monthlyConsumption, limitedArea, irradianceAvg, panelPotential, panelSize)
    const yearlyProduction = monthlyProduction*12
    const estimatedSavings = solarPanel.getEstimatedSavings(yearlyProduction, kwhValue)
    var requiredArea = limitedArea
    if (!limitedArea) {
      requiredArea = solarPanel.getRequiredArea(monthlyProduction, irradianceAvg, panelPotential, panelSize)
    }
    const weight = solarPanel.getWeight(requiredArea, panelSize, panelWeight)

    result = {...result,
      monthlyProduction: monthlyProduction,
      yearlyProduction: yearlyProduction,
      estimatedSavings: estimatedSavings,
      weight: weight,
      requiredArea: requiredArea
    }
    return result
}

app.get("/", async (req, res) => {
    try {
      const dataResult = await getDataResult(req.query)
      
      res.send(dataResult)
    } catch (err) {
      res.status(400).send({ message: err })
    }
  })