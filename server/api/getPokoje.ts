export default defineEventHandler(async (event) => {
    const url = 'https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Po%C4%8Det_ubytovan%C3%BDch_v_DDM_a_intern%C3%A1tech/FeatureServer/0/query?where=1%3D1&outFields=nazev_organizace,pocet_luzkove_kapacity,celkovy_pocet_pokoju,www&outSR=4326&f=json'
    const response = await fetch(url)
    const data = await response.json()

   // make a new array with the same structure as the schools array

    const rooms = data.features.map((school: any) => {
        return {
            nazev_organizace: school.attributes.nazev_organizace,
            pocet_luzkove_kapacity: school.attributes.pocet_luzkove_kapacity,
            celkovy_pocet_pokoju: school.attributes.celkovy_pocet_pokoju,
            wwww: school.attributes.www,
        }
    })


    return rooms
})