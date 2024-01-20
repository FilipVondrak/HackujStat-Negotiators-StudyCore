<script setup lang="ts">

</script>

<template>
  <div class="projekt">
    <div class="content">
      <h3 id="nazevProjektu">Můj Projekt</h3>
      <p id="popisProjektu">hackathon 2024 hackuj stat</p>
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
</template>

<style scoped>
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