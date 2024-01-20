<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">
  <link href='https://unpkg.com/css.gg@2.0.0/icons/css/pen.css' rel='stylesheet'>

  <div id="container" style="max-height: 100%">
    <section id="projektyContainer">
      <div class="tenBorder">
        <div class="title">Veřejné projekty</div>
        <div class="search">
          <input class="search__input" type="text" placeholder="Vyhledat...">

        </div>
        <div class="projekty">
          <div class="projekt">
            <div class="content">
              <h3 id="nazevProjektu">Můj projekt</h3>
              <p id="popisProjektu">hackathon 2024 hackuj stat</p>

            </div>
          </div>

        </div>
      </div>

    </section>
  </div>

</template>

<style scoped>
.title {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #D396FDFF;
  font-weight:bold;
  font-weight: 400;
  font-size: 2rem;
  letter-spacing:4px;
  text-align: center;
  text-transform: uppercase;
}
#container{
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("assets/Images/background.webp");
  background-size: cover;
  background-position: center;
  font-family: 'Oxanium', sans-serif;
}

#projektyContainer{
  display: flex;
  margin-top: 85px;
  height: 75vh;
  justify-content: center;
  align-items: center;

}

.tenBorder {
  flex: 1;
  border-radius:20px;
  padding: 3rem;
  text-shadow: 0 1px #00000010;
  margin: 8rem auto;
  border: #ffffff;
  backdrop-filter: blur(8px);
  border: 1px white solid;
  height: 75vh;
  overflow: auto;
}
.tenBorder:first-child{
  margin-right: 20px;
}
.projekty{

}
.projekt{
  height: fit-content;
  min-height: 15vh;
  max-width: 50vh;
  border-radius: 10px;
  padding: 10px 0;
  margin: 10px;
  border: none;
  border-bottom: 2px solid #fff;
  border-top: 2px solid #fff;
  outline: none;
  transition:  0.5s;

}
.projekt:hover{
  background-color: rgba(53, 38, 72, 0.58);
  transform: scale(1.05);
}
.content{
  margin: 10px;

}

#nazevProjektu{
  color: white;
  font-weight: 400;
  font-size: 1.5em;
}
#popisProjektu{
  color: #C6B8C5;
  margin-top: 10px;
}
.search{
  margin-bottom: 50px;
}
input{
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  font-size: 18px;
  color: #fff;
  padding: 5px 0;

}

</style>
<script setup lang="ts">

</script>