<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Card from "../components/Card.vue";
import Boton from "../components/Boton.vue";
</script>
<template>
  <Header variant="normal" />

  <main class="mx-auto px-4 py-8 w-full max-w-7xl">
    <!-- Título -->
    <h1
      class="text-center text-3xl md:text-4xl font-bold text-[var(--guinda-100)] mb-8 md:mb-12"
    >
      ¡Bienvenido al portal de reportes!
    </h1>

    <!-- Contenedor de Cards - versión mejorada -->
    <div class="flex flex-col md:flex-row justify-center gap-6 w-full">
      <div class="w-full md:w-auto md:min-w-[400px]">
        <Card />
      </div>
      <div class="w-full md:w-auto md:min-w-[400px]">
        <Card />
      </div>
    </div>

    <router-link to="/AuxilioEscolar/Llegada">
      <Boton variant="primario" size="large" class="w-full">Ir a Llegada</Boton>
    </router-link>
  </main>

  <Footer />
</template>
