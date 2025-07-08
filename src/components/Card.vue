<script setup>
    import Boton from "./Boton.vue";
</script>

<template>
  <div class="card bg-[var(--marfil)] text-[var(--gris-100)] rounded-lg shadow-md w-full p-4 mx-auto">
    <div class="text-center font-bold text-lg mb-3 card-header">
      Título del Programa Social
    </div>
    <div class="text-center mb-4">
      Breve descripción de un programa social para los participantes.
    </div>
    <div class="flex justify-center">
      <Boton variant="primario" size="medium">Click aquí</Boton>
    </div>
  </div>
</template>

<style>
    .card-header {
        height: 6em;
    }
</style>