<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">
  <link href='https://unpkg.com/css.gg@2.0.0/icons/css/pen.css' rel='stylesheet'>
  <link href='https://unpkg.com/css.gg@2.0.0/icons/css/more-r.css' rel='stylesheet'>
  <link href='https://unpkg.com/css.gg@2.0.0/icons/css/eye.css' rel='stylesheet'>

  <div id="container" style="max-height: 100%">
    <section id="projektyContainer">
      <div class="tenBorder">
        <div class="title">Rozdělané Projekty</div>
        <div class="projekty">
          <div class="projekt">
            <div class="content">
              <h3 id="nazevProjektu">Study Core</h3>
              <p id="popisProjektu">vše na jednom místě pro studenty</p>
              <div class="tlacitka">
                <button class="tlacitko" >
                  <i class="gg-pen"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-more-r"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-eye"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="tenBorder">
        <div class="title">Dokončené Projekty</div>
        <div class="projekty">
          <
        </div>
      </div>
      <div class="tenBorder">
        <div class="title">Naplánované <br> Projekty</div>
        <div class="projekty">
          <div class="projekt">
            <div class="content">
              <h3 id="nazevProjektu">StudyCore rozšíření</h3>
              <p id="popisProjektu">propojit projekt se všemi školami po celé ČR</p>
              <div class="tlacitka">
                <button class="tlacitko" >
                  <i class="gg-pen"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-more-r"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-eye"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="projekt">
            <div class="content">
              <h3 id="nazevProjektu">Propojení s komunitou</h3>
              <p id="popisProjektu">k čemu portál pro studenty, bez studentů?</p>
              <div class="tlacitka">
                <button class="tlacitko" >
                  <i class="gg-pen"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-more-r"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-eye"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="projekt">
            <div class="content">
              <h3 id="nazevProjektu">Around the World</h3>
              <p id="popisProjektu">a co třeba mezinárodní komunikace? YES!</p>
              <div class="tlacitka">
                <button class="tlacitko" >
                  <i class="gg-pen"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-more-r"></i>
                </button>
                <button class="tlacitko" >
                  <i class="gg-eye"></i>
                </button>
              </div>
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
  margin-bottom: 3rem;
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
  margin-top: 100px;
  height: 75vh;
  justify-content: center;
  align-items: center;
  gap: 20px;


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
  max-width: 60vh;
  overflow: auto;
}


.projekty{
  margin: 10px;

  display: flex;
  flex-direction: column-reverse;

}
.projekt{
  height: fit-content;
  min-height: 15vh;
  max-width: 50vh;
  border-radius: 10px;
  padding: 10px 0;
  margin: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #fff;
  border-top: 2px solid #fff;
  outline: none;
  transition:  0.5s;



}
.projekt:hover{
  background-color: rgba(53, 38, 72, 0.58);

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
.tlacitka{
  margin-top: 10px;
  margin-bottom: 10px;

  display: flex;
  gap: 10px;

}
.tlacitko{
  background: transparent;
  border: none;
  transition:  0.5s;
  width: 30px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tlacitko:hover{
  transform: scale(1.3);
  .gg-pen{
    color: #D396FDFF;
  }
  .gg-more-r{
    color: #D396FDFF;
  }
  .gg-eye{
    color: #D396FDFF;
  }
}
.gg-pen{
  color: #8c8696;

}
.gg-more-r{
  color: #8c8696;
}
.gg-eye{
  color: #8c8696;
}
</style>
<script setup lang="ts">
import Projekt from "@/components/Projekt.vue";
</script>