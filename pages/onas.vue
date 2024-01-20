<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">

  <div id="container">
    <div id="html">

      <section>
      <h1>StudyCore by Negotiators</h1>
      </section>

      <section>


        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div class="container">
                <div class="row">
                    <h2>Co je naším cílem?</h2>

                </div>
              </div>
              <p>Naším hlavním cílem je zpříjemnit a ulehčit život studentů. Uchazeči, kteří si nevědí rady s výběrem své budoucí školy nebo oboru si mohou zkusit náš kvíz, který využívá umělou inteligenci. Chceme propojit studenty z různých škol s pomocí UniChatu, což je unikátní chatovací fórum. Studenti budou moci sdílet své znalosti, poznatky ale i obtížné úkoly přes skupiny, do kterých budou rozděleni podle oboru.</p>
              <h2>A dále...</h2>
              <p>Nezapomněli jsme ani na učitele, kteří si budou moci udělat oddělenou skupinu a sdílet své materiály a nápady s ostatními. Také jsme udělali Katalog škol, kde jsou všechny školy v České republice na jednom místě.</p>
              <p>Udělali jsme i místo pro sdílení projektů pro vylepšenou produktivitu.</p>
              <h2>Co jsme použili:</h2>
              <p>Pracovali jsme ve frameworku Nuxt3, který je velmi pokročilý a moderní. Poté jsme využili našich znalostí: javascriptu, html, css. Open data jsme čerpali ze stránky datakhk.cz a  data.gov.cz použili jsme databáze spojené se školstvím a s ubytováním mládeže.</p>

            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img class = "obr" src="~/assets/Images/us-photo.jpg">
            </div>
          </div>
        </div>

<br>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2>Kontakty</h2>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <p><a href="https://www.instagram.com/infrodosiron/">Mykola Bondar</a></p>
              <p class="email-phone">ten s modrými oči</p>
              <p class="email-phone">+420 608 692 434</p>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <p><a href="https://www.instagram.com/all_eyez_on_lili/">Liliana Charbaková</a></p>
              <p class="email-phone">ta holka</p>
              <p class="email-phone">+420 606 031 005</p>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <p><a href="https://www.instagram.com/vondrak.filip/">Filip Vondrák</a></p>
              <p class="email-phone">ten s vousy</p>
              <p class="email-phone">+420 731 740 713</p>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <p><a href="https://sposdk.cz/">Střední průmyslová škola a Střední odborná škola</a></p>
              <p class="email-phone">Dvůr Králové nad Labem</p>

            </div>

          </div>
        </div>

      </section>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.obr{
  border-radius: 20px;
}

#html{
  border-radius:20px;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.78);
  text-shadow: 0 1px #00000010;
  width: 85%;
  margin: 9rem auto;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.31);
  border: 1px rgba(255, 255, 255, 0.78) solid;
}

#container{
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #0a0a0a;
  margin: 0;
  padding: 0;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("assets/Images/background.webp");
  background-size: cover;
  background-position: center;
  font-family: 'Gothic A1', sans-serif;
  font-family: 'Oxanium', sans-serif;
}

img {
  max-width: 100%;
  max-height: 100%;
}

h1 {
  font-size: 50px;
  margin-top: 30px;
  margin-bottom: 20px;
}

h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

  p {
    font-size: 18px;
  }

.container
{
  width:100%;
  padding-right:15px;
  padding-left:15px;
  margin-right:auto;
  margin-left:auto
}
@media (min-width:576px)
{
  .container{max-width:540px}
}@media (min-width:768px)
{
  .container{max-width:720px}
}
@media (min-width:992px)
{
  .container{max-width:960px}
}
@media (min-width:1200px)
{
  .container{max-width:1140px}
}
@media (min-width:1500px)
{
  .container{max-width:1400px}
}
@media (min-width:1800px)
{
  .container{max-width:1600px}
}

.row{
  display:-ms-flexbox;
  display:flex;
  -ms-flex-wrap:wrap;
  flex-wrap:wrap;
  margin-right:-15px;
  margin-left:-15px
}

.col-12{
  -ms-flex:0 0 100%;
  flex:0 0 100%;
  max-width:100%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-sm-12{
  -ms-flex:0 0 100%;
  flex:0 0 100%;
  max-width:100%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-md-6{
  -ms-flex:0 0 50%;
  flex:0 0 50%;
  max-width:50%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-lg-6{
  -ms-flex:0 0 50%;
  flex:0 0 50%;
  max-width:50%;
  position: relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-xl-6{
  -ms-flex:50 0 50%;
  flex:0 0 50%;
  max-width:50%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-lg-3{
  -ms-flex:0 0 25%;
  flex:0 0 25%;
  max-width:25%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-xl-3{
  -ms-flex:0 0 25%;
  flex:0 0 25%;
  max-width:25%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

a{
  font-size: 20px;
  color: #c4c2fa;
  text-decoration:none;
  background-color:transparent
}
a:hover{
  font-size: 19px;
  color: #ad33ff;
  text-decoration: none
}

.email-phone{
  font-size: 20px;
  text-decoration:none;
  background-color:transparent
}

.imglogo{
  height: 100%;
}

</style>