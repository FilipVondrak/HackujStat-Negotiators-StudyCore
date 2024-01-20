export default defineEventHandler(async (event) => {
    const url = 'https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?where=1%3D1&outFields=nazev,www&outSR=4326&f=json'
    const response = await fetch(url)
    const data = await response.json()

    // make a new array with the same structure as the schools array

    const www = data.features.map((school: any) => {
        return {
            nazev_organizace: school.attributes.nazev,
            wwww: school.attributes.www,
        }
    })

    return www
})