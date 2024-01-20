<template>
  <default>
    <NuxtPage />
  </default>
</template>

<style>
* {
  max-width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}
</style>

<script setup >
import Default from "~/layout/default.vue";
const supabase = useSupabaseClient()
const id = ref(1)

// get data from getSchoolsAndSubjects api
const { data: schools } = await useFetch('/api/getSchoolsAndSubjects');

// remove everything from the database
const { error: deleteError } = await supabase
  .from('skoly')
  .delete()

// console.log(schools.value);
schools.value.forEach(pridatDoDatabaze)

async function pridatDoDatabaze(item) {
  // console.log(item);

  // Check if the school with the same name already exists
  const { data: existingSchools, error: selectError } = await supabase
      .from('skoly')
      .select('nazev_organizace')
      .eq('nazev_organizace', item.nazev_organizace);

  if (selectError) {
    // console.error(selectError);
    return; // Exit function if there's an error in the select query
  }

  if (existingSchools && existingSchools.length > 0) {
    // console.log('School with the same name already exists. Not adding to the database.');
    return; // Exit function if the school already exists
  }

  // If the school doesn't exist, proceed with insertion
  const { error: insertError } = await supabase
      .from('skoly')
      .insert([
        {
          nazev_organizace: item.nazev_organizace,
          nazev_okresu: item.nazev_okresu,
          nazev_obce: item.nazev_obce,
          obory: item.obory,
          locationX: item.locationX,
          locationY: item.locationY,
          www: item.www,
          pocet_pokoju_na_intru: item.celkovy_pocet_pokoju,
          pocet_luzek_na_intru: item.pocet_luzkove_kapacity,
        },
      ]);

  if (insertError) {
    console.error(insertError);
  } else {
    //console.log('School added to the database.');
  }

  //this.id = id + 1;
  // add subjects to the database
}
// add the data to the supabase

// foreach school in schools save name to a variable



</script>