const express = require("express")
const solarPanel = require("./solarPanel")

const app = express()

app.use(express.json())

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening port " + port)
})

async function getDataResult(data) {
    var result = {}
    const kwhValue = data.kwh_value
    const monthlyConsumption = data.monthly_consumption
    const limitedArea = data.limited_area
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
    const estimatedSavings = solarPanel.getEstimatedSavings(monthlyConsumption, kwhValue)
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
    const dataResult = await getDataResult(req.body)
    
    res.send(dataResult)
  } catch (err) {
    res.status(400).send({ message: err })
  }
})

module.exports