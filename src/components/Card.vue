<script setup>
import Boton from "./Boton.vue";
</script>

<template>
  <div class="card bg-marfil text-gris-100 rounded-[var(--border-radio-4)] shadow-md w-full p-[var(--espacio-16)] mx-auto border border-gris-20">
    <div class="text-center text-[var(--titulo-2-size)] leading-[var(--titulo-2-leading)] mb-[var(--espacio-16)] card-header font-[var(--font-titulo)]">
      <slot name="titulo">Título del Programa Social</slot>
    </div>
    <div class="text-center mb-[var(--espacio-24)] text-[var(--cuerpo-2-size)] leading-[var(--cuerpo-2-leading)] font-[var(--font-contenido)]">
      <slot name="descripcion">Breve descripción de un programa social para los participantes.</slot>
    </div>
    <div class="flex justify-center">
      <Boton 
        variante="primario" 
        tamano="mediano"
        class="w-full md:w-auto"
      >
        <slot name="boton">Click aquí</slot>
      </Boton>
    </div>
  </div>
</template>

<style>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-x) calc(var(--sombra-y) + 2px) var(--sombra-blur) var(--sombra-color);
}

.card-header {
  height: 6em;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Efecto de hover en el botón dentro de la card */
.card:hover .btn--primario:not(.btn--deshabilitado) {
  background-color: var(--color-guinda-100);
  transform: scale(1.02);
}
</style>