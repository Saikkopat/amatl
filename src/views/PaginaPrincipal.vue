<script setup>
import Boton from "../components/Boton.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <div class="bg-gray-900 h-100">
    <Boton variant="primario" size="large">Botón Primario</Boton>
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
