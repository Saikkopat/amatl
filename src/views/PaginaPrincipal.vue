<script setup>
import Boton from "../components/Boton.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <Header />
  
  <div class="bg-gray-900 h-100">
    <router-link to="/Boceto">
      <Boton variant="primario" size="large">Botón Primario</Boton>
    </router-link>
    <Boton variant="secundario" size="medium">Botón Secundario</Boton>
    <Boton variant="terciario" size="small">Botón Terciario</Boton>
    <Boton variant="terciario" size="small" disabled>Botón Inactivo</Boton>

    <div class="text-red-400 titulo-1">
      This is Cabin and not blue!
      <p class="text-blue-100">This should be Roboto.</p>
    </div>
  </div>

  <Footer />
</template>
