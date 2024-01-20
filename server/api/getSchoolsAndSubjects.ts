export default defineEventHandler(async (event) => {
    let url = 'https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Počty_žáků_v_oborech_středních_škol_zřizovaných_krajem/FeatureServer/0/query?where=1%3D1&outFields=nazev_obce,nazev_ulice,cislo_domovni,typ_cisla_domovniho,cislo_orientacni,psc,obor_nazev,nazev_okresu,nazev_organizace&outSR=4326&f=json'
    let response = await fetch(url)
    let data = await response.json()
    const schools = data.features.map((school: any) => {
        return {
            name: school.attributes.nazev_organizace,
            /*
            street: school.attributes.nazev_ulice,
            streetNumber: school.attributes.cislo_domovni,
            streetNumberType: school.attributes.typ_cisla_domovniho,
            orientationNumber: school.attributes.cislo_orientacni,
            zipCode: school.attributes.psc,
             */
            locationX: school.geometry.x,
            locationY: school.geometry.y,
            city: school.attributes.nazev_obce,
            district: school.attributes.nazev_okresu,
            field: school.attributes.obor_nazev,
        }
    })

    for (let i = schools.length - 1; i >= 0; i--) {
        if (schools[i].field.includes("Celkem") || schools[i].field.includes("celkového") || schools[i].field.includes("z toho") || schools[i].field.includes("z řádku")) {
            schools.splice(i, 1);
            //console.log("removed");
        }
    }

    /*
    const SchoolsAndSubjects: any[] = schools.reduce((accumulator: any, school: any) => {
        const existingSchool = accumulator.find((s: any) => s.nazev_organizace === school.name);
        if (existingSchool) {
            existingSchool.obory.push(school.field);
        } else {
            const newSchool = {
                nazev_organizace: school.name,
                nazev_okresu: school.district,
                nazev_obce: school.city,
                nazev_ulice: school.street,
                cislo_domovni: school.streetNumber,
                typ_cisla_domovniho: school.streetNumberType,
                cislo_orientacni: school.orientationNumber,
                psc: school.zipCode,
                obory: [school.field],

            };
            accumulator.push(newSchool);
        }
        return accumulator;
    }, []);
    */
    // add the location to the final array

    let SchoolsAndSubjects: any[] = schools.reduce((accumulator: any, school: any) => {
        const existingSchool = accumulator.find((s: any) => s.nazev_organizace === school.name);
        if (existingSchool) {
            existingSchool.obory.push(school.field);
        } else {
            const newSchool = {
                nazev_organizace: school.name,
                locationX: school.locationX,
                locationY: school.locationY,
                nazev_obce: school.city,
                nazev_okresu: school.district,
                obory: [school.field],
                pocet_luzkove_kapacity: 0,
                celkovy_pocet_pokoju: 0,
                www: "",
            };
            accumulator.push(newSchool);
        }
        return accumulator;
    }, []);

    url = 'https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Po%C4%8Det_ubytovan%C3%BDch_v_DDM_a_intern%C3%A1tech/FeatureServer/0/query?where=1%3D1&outFields=nazev_organizace,pocet_luzkove_kapacity,celkovy_pocet_pokoju,www&outSR=4326&f=json'
    response = await fetch(url)
    data = await response.json()

    // make a new array with the same structure as the schools array

    const rooms = data.features.map((school: any) => {
        return {
            nazev_organizace: school.attributes.nazev_organizace,
            pocet_luzkove_kapacity: school.attributes.pocet_luzkove_kapacity,
            celkovy_pocet_pokoju: school.attributes.celkovy_pocet_pokoju,
        }
    })

    url = 'https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?where=1%3D1&outFields=nazev,www&outSR=4326&f=json'
    response = await fetch(url)
    data = await response.json()

    // make a new array with the same structure as the schools array

    const www = data.features.map((school: any) => {
        return {
            nazev_organizace: school.attributes.nazev,
            wwww: school.attributes.www,
        }
    })

    // find the school in SchoolsAndSubjects with the same name as the school in www and add the www to the final array
    for (let i = 0; i < SchoolsAndSubjects.length; i++) {
        for (let j = 0; j < www.length; j++) {
            if (SchoolsAndSubjects[i].nazev_organizace === www[j].nazev_organizace) {
                SchoolsAndSubjects[i].www = www[j].wwww;
            }
        }
    }

    for (let i = 0; i < SchoolsAndSubjects.length; i++) {
        for (let j = 0; j < rooms.length; j++) {
            if (SchoolsAndSubjects[i].nazev_organizace === rooms[j].nazev_organizace) {
                SchoolsAndSubjects[i].pocet_luzkove_kapacity = rooms[j].pocet_luzkove_kapacity;
                SchoolsAndSubjects[i].celkovy_pocet_pokoju = rooms[j].celkovy_pocet_pokoju;
            }
        }
    }


    // add the rooms to the final array
    /*
    for (let i = 0; i < SchoolsAndSubjects.length; i++) {
        for (let j = 0; j < rooms.length; j++) {
            if (SchoolsAndSubjects[i].nazev_organizace === rooms[j].nazev_organizace) {
                SchoolsAndSubjects[i].pocet_luzkove_kapacity = rooms[j].pocet_luzkove_kapacity;
                SchoolsAndSubjects[i].celkovy_pocet_pokoju = rooms[j].celkovy_pocet_pokoju;
                SchoolsAndSubjects[i].www = rooms[j].www;
            }
        }
    }
    */

    return SchoolsAndSubjects
})