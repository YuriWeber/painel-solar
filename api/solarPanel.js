const api = require("./api")

async function getIrradianceAvg(lat, lng) {
  try {
    const { data } = await api.get(`point?parameters=SI_EF_TILTED_SURFACE&community=RE&format=JSON&latitude=${lat}&longitude=${lng}`)
    const irradiances = data.properties.parameter.SI_EF_TILTED_SURFACE_HORIZONTAL
    var irradianceAvg = 0

    for (i in irradiances) {
      if (i.toLowerCase() !== "ann" && irradiances[i] > 0) {
        irradianceAvg += irradiances[i]
      }
    }

    // média considerando 12 meses
    irradianceAvg = irradianceAvg/12

    return irradianceAvg
  } catch (error) {
    throw "Erro inesperado ao consultar os dados de irradiação solar. O resultado pode não estar preciso."
  }
}

function getMonthlyProduction(monthlyConsumption, limitedArea, irradianceAvg, panelPotential, panelSize) {
  if (limitedArea) {
    const panelsNumber = getPanelsNumber(limitedArea, panelSize)
    const panelProduction = getPanelProduction(panelPotential, irradianceAvg)

    const montlhyProduction = panelProduction * panelsNumber

    return +(montlhyProduction.toFixed(2))
  }

  return monthlyConsumption
}

function getPanelProduction(panelPotential, irradianceAvg) {
  return ((panelPotential * irradianceAvg * 0.8) / 1000) * 30
}

function getPanelsNumber(area, panelSize) {
  return Math.ceil(area / panelSize)
}

function getEstimatedSavings(yearlyProduction, kwhValue) {
  return ((yearlyProduction * kwhValue).toFixed(2))
}

function getRequiredArea(monthlyProduction, irradianceAvg, panelPotential, panelSize) {
  const panelProduction = getPanelProduction(panelPotential, irradianceAvg)
  const panelsNumber = monthlyProduction/panelProduction

  const requiredArea = panelsNumber * panelSize

  return +(requiredArea.toFixed(2))
}

function getWeight(area, panelSize, panelWeight) {
  const panelsNumber = getPanelsNumber(area, panelSize)

  return panelsNumber * panelWeight
}

module.exports.getIrradianceAvg = getIrradianceAvg
module.exports.getMonthlyProduction = getMonthlyProduction
module.exports.getEstimatedSavings = getEstimatedSavings
module.exports.getRequiredArea = getRequiredArea
module.exports.getWeight = getWeight