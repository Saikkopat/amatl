<script setup>
  import Boton from '../src/components/Boton.vue';
</script>
<template>

<div class="bg-gray-900 h-100">

<Boton variant="primary" size="large">Botón Primario</Boton>
<Boton variant="secondary" size="medium">Botón Secundario</Boton>
<Boton variant="tertiary" size="small" disabled>Botón Inactivo</Boton>
  <div class="text-red-400 titulo-1">
    This is Cabin and not blue!
    <p class="text-blue-100">
      This should be Roboto.
    </p>
  </div>
</div>

</template>