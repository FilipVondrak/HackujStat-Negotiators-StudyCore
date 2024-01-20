<template>

  <div id="container">

    <section id="nastenka">

      <div class="left">

        <div class="hledaniFiltru">
          <input class="select" type="text" v-model="hledaniFiltruText" @input="updateFilteredSubjects" placeholder="Vyhledávání filtru...">
        </div>

        <div class="tenBorder2">
          <h1>Filtry</h1>
          <div class="filters">
            <div v-for="(subject, index) in filteredSubjects" :key="index">
              <input :id="'toggleSwitch' + index" type="checkbox" class="custom-checkbox">
              <label :for="'toggleSwitch' + index" class="switch"></label>
              {{ subject }}
              <br>
            </div>

            <hr>

            <!-- ... (ваш существующий код) -->

    <div v-for="okres in vsechnyOkresy" :key="okres">
      <input :id="'toggleSwitchOkres' + okres" type="checkbox" class="custom-checkbox">
      <label :for="'toggleSwitchOkres' + okres" class="switch"></label>
      {{ okres }} <!-- Отображение округов после переключателя -->
      <br>
    </div>
  </div>

</div>
      </div>

      <div class="left">

        <div class="hledani">
          <input class="select" type="text" v-model="searchText" @input="searchSchools" placeholder="Vyhledávání školy...">
        </div>

<div class="tenBorder">
  <h1>Seznam škol</h1>
      <div class="seznam ">
        <!-- Отображение отфильтрованных школ здесь -->
        <ul>
          <li v-for="result in filteredSchools" :key="result" @click="handleSchoolClick(result)">
            {{ result }}
          </li>
        </ul>
      </div>
</div>
      </div>


      <div class="info">
        <h1>Nazev školy</h1>
        <div class="nazev">
          <h4>{{ nazevOrganizace }}</h4>
        </div><br>

        <h1>Webové stránky</h1>
        <div class="www">
          <h4> <a href="{{www}}">{{ www }}</a></h4>
        </div><br>

<h1>Počet pokojů na intru</h1>
        <div class="pocet_pokoju_na_intru">
          <h4>{{ pocet_pokoju_na_intru }}</h4>
        </div><br>

        <h1>Obec</h1>
        <div class="obec">
          <h4>{{ nazevObce }}</h4>
        </div><br>

        <h1>Okres</h1>
        <div class="okres">
          <h4>{{ nazevOkresu }}</h4>
        </div><br>

        <h1>Obory</h1>
        <div class="obory">
          <h4><ul>
            <li v-for="obor in oborySkoly" :key="obor">
              {{ obor }}
            </li>
          </ul></h4>
        </div>


          <MapboxMap
              map-id="{ID}"
              style="margin-bottom: 1%; margin-top: 80%; width: 97%; height: auto; order: 1; border-radius: 10px; border-color: #ffffff; border-width: 1px; border-style: solid"
              :options="{
        style: 'mapbox://styles/mapbox/light-v11',
        center: [locationX, locationY],
        zoom: 14,
      }"
          />

      </div>


    </section>

  </div>
</template>

<script setup>
import unorm from 'unorm';

import {ref, onMounted} from "vue";

const Schools = ref([])
const Obory = ref([])

const { data: schools } = await useFetch('/api/getSchools')
//console.log(schools.value.length)
for (let i = 0; i < schools.value.length; i++) {
  Schools.value.push(schools.value[i])
}

const { data: obory } = await useFetch('/api/getSubjects')
for (let i = 0; i < obory.value.length; i++) {
  Obory.value.push(obory.value[i])
}

const SkolyAObory = ref([])
async function ZmenaSkoly() {
  const { data: SkolyAObory } = await useFetch('/api/getSchoolsAndSubjects')
  // find the selected school
  const selectedSchool = SkolyAObory.value.find(school => school.nazev_organizace === skola.value)
  console.log(selectedSchool)
  // set the subjects
  Obory.value = selectedSchool.obory

}

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  await navigateTo('/');
};

const user = useSupabaseUser();
const supabase = useSupabaseClient()

const email = ref(user.value.email)
const jmeno = ref('')
const prijmeni = ref('')
const skola = ref('')
const obor = ref('')

const { data } = await supabase
    .from('profiles')
    .select(`first_name, last_name, skola, obor`)
    .eq('id', user.value.id)
    .single()

if(data) {
  jmeno.value = data.first_name
  prijmeni.value = data.last_name
  skola.value = data.skola
  obor.value = data.obor
}

async function updateProfile() {
  try {
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      first_name: jmeno.value,
      last_name: prijmeni.value,
      skola: skola.value,
      obor: obor.value,
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {

  }
}
// ... (Ваш существующий код настройки)

const searchText = ref('');
const filteredSchools = ref([]);

onMounted(async () => {
  // Получение списка школ из API при монтировании компонента
  const { data: schools } = await useFetch('/api/getSchools');

  // Заполнение массивов Schools и filteredSchools полученными данными
  Schools.value = schools.value;
  filteredSchools.value = schools.value;
});

function normalizeText(text) {
  return unorm.nfd(text).replace(/[\u0300-\u036f]/g, '');
}

function searchSchools() {
  const normalizedSearchText = normalizeText(searchText.value.toLowerCase());
  filteredSchools.value = Schools.value.filter(school => normalizeText(school.toLowerCase()).includes(normalizedSearchText));
}
// ... (ваш существующий скрипт)

const nazevOrganizace = ref('')
const nazevOkresu = ref('')
const nazevObce = ref('')
const oborySkoly = ref([])
const locationX = ref('0')
const locationY = ref('0')
const www = ref('')
const pocet_pokoju_na_intru = ref('')
const pocet_luzek_na_intru = ref('')

const handleSchoolClick = async (schoolName) => {
  // Добавьте код для обработки нажатия на название школы
  //console.log(`Clicked on school: ${schoolName}`);
  // find the selected school in the database
  const { data: selectedSchool, error } = await supabase
      .from('skoly')
      .select('*')
      .eq('nazev_organizace', schoolName)
      .single()
  //console.log(selectedSchool)

  // set the school info
  nazevOrganizace.value = selectedSchool.nazev_organizace
  nazevOkresu.value = selectedSchool.nazev_okresu
  nazevObce.value = selectedSchool.nazev_obce
  oborySkoly.value = selectedSchool.obory
  locationX.value = selectedSchool.locationX
  locationY.value = selectedSchool.locationY
  www.value = selectedSchool.www
  pocet_pokoju_na_intru.value = selectedSchool.pocet_pokoju_na_intru
  pocet_luzek_na_intru.value = selectedSchool.pocet_luzek_na_intru

  // Дополнительные действия, которые вы хотите выполнить при нажатии

  //ziskat obory z backend api

};


const { data: vsechnyObory } = await useFetch('/api/getSubjects')
console.log(vsechnyObory.value)

// ziskat vsechny okresy z databaze
const vsechnyOkresy = ref([])

async function getOkresy() {
  const { data: skoly, error } = await supabase
      .from('skoly')
      .select('*')

  for (let i = 0; i < skoly.length; i++) {
    vsechnyOkresy.value.push(skoly[i].nazev_okresu)
    //console.log(skoly[i].nazev_okresu)
  }

}
// getOkresy()
//console.log(vsechnyOkresy)

const hledaniFiltruText = ref('');
const filteredSubjects = ref([]);

function updateFilteredSubjects() {
  const normalizedSearchText = normalizeText(hledaniFiltruText.value.toLowerCase());
  filteredSubjects.value = Obory.value.filter(subject => normalizeText(subject.toLowerCase()).includes(normalizedSearchText));
}
</script>

<style scoped>
.tenBorder {
  height: 90%;
  margin-left: 1%;
  padding: 1vh;
  border-radius: 10px;
  align-self: flex-start;
  flex: 1;
  backdrop-filter: blur(8px);
  border: 1px white solid;
}

.tenBorder2 {
  margin-left: 1%;
  padding: 1vh;
  height: 90%;
  border-radius: 10px;
  align-self: flex-start;
  flex: 1;
  backdrop-filter: blur(8px);
  border: 1px white solid;
}

#container{
  padding: 1%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("assets/Images/background.webp");
  background-size: cover;
  background-position: center;
  font-family: 'Oxanium', sans-serif;
}

#nastenka{
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.left {
  height: 100%;
  margin-left: 1%;
  word-wrap: break-word;
  color: #ffffff;
  align-self: flex-start;
  flex: 1;
  text-shadow: 0 1px #00000010;
  backdrop-filter: blur(8px);
}

.hledani {
  margin-bottom: 1%;
  margin-left: 1%;
  padding: 10px;
  overflow-y: auto;
  border-radius: 10px;
  word-wrap: break-word;
  color: #ffffff;
  align-self: flex-start;
  flex: 1;
  text-shadow: 0 1px #00000010;
  backdrop-filter: blur(8px);
  border: 1px white solid;
  height: 9%;
}

.hledaniFiltru {
  margin-bottom: 1%;
  margin-left: 1%;
  padding: 10px;
  overflow-y: auto;
  border-radius: 10px;
  word-wrap: break-word;
  color: #ffffff;
  align-self: flex-start;
  flex: 1;
  text-shadow: 0 1px #00000010;
  backdrop-filter: blur(8px);
  border: 1px white solid;
  height: 9%;
}

.filters {
  margin-left: 1%;
  padding: 1%;
  overflow-y: auto;
  word-wrap: break-word;
  color: #ffffff;
  align-self: flex-start;
  flex: 1;
  text-shadow: 0 1px #00000010;
  backdrop-filter: blur(8px);
  height: 95%;

  label {
    margin-bottom: 8px;
  }
  input[type="checkbox"] {
    display: none; /* Скрыть оригинальные чекбоксы */
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    background-color: #949494;
    border-radius: 34px;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      border-radius: 50%;
      transition: .4s;
    }
  }

  input[type="checkbox"]:checked + .switch:before {
    transform: translateX(26px);
    background-color: white;
  }

  input[type="checkbox"]:checked + .switch {
    background-color: #553e72;
  }
}

.seznam {
  height: 95%;
  margin-left: 1%;
  padding-left: 1%;
  padding-right: 1%;
  overflow-y: auto;
  border-radius: 10px;
  align-self: flex-start;
  flex: 1;
  backdrop-filter: blur(8px);
  word-wrap: break-word;
  color: #ffffff;
}

.seznam ul {
  list-style: none;  /* Убираем маркеры списка */
  padding: 0;
  margin: 0;
}

.seznam li {
  color: #ffffff;
  text-shadow: 0 1px #00000010;
  cursor: pointer;  /* Изменяем курсор на указатель при наведении на название школы */
  font-size: 22px;  /* Увеличиваем размер текста */
  margin-bottom: 8px;  /* Увеличиваем расстояние между названиями школ */
}

.seznam li:hover {
  background-color: rgba(74, 0, 117, 0.58);  /* Добавляем небольшой фон при наведении */
  color: #c59efa;
}

.info {
  margin-left: 1%;
  padding: 10px;
  overflow-y: auto;
  border-radius: 10px;
  word-wrap: break-word;
  color: #ffffff;
  align-self: flex-start;
  flex: 1;
  text-shadow: 0 1px #00000010;
  backdrop-filter: blur(8px);
  border: 1px white solid;
  height: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
}

.select {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  font-size: 18px;
  color: #fff;
  padding: 5px 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #949494;
  border-radius: 34px;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
  }

  &:checked + .switch:before {
    transform: translateX(26px);
    background-color: white;
  }

  &:checked + .switch {
    background-color: #553e72;
  }
}

@media (min-width:576px)
{
  .select{max-width:540px}
}@media (min-width:768px)
{
  .select{max-width:720px}
}
@media (min-width:992px)
{
  .select{max-width:960px}
}
@media (min-width:1200px)
{
  .select{max-width:1140px}
}
@media (min-width:1500px)
{
  .select{max-width:1400px}
}
@media (min-width:1800px)
{
  .select{max-width:1600px}
}

option {
  color: black;
}
</style>
