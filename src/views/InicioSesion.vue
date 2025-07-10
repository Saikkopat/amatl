<script setup>
import Boton from "../components/Boton.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <Header variant="titulo"/>
  <div class="container px-5 mx-auto h-120 flex items-center justify-center text-gris-100">
    <div
      class="card container bg-marfil text-center p-6 rounded-lg shadow-md max-w-md"
    >
      <h1 class="titulo-1 mb-6">Inicio de sesión</h1>

      <form class="cuerpo-1 mx-auto space-y-4">
        <div class="space-y-2">
          <label
            class="cuerpo-2 text-guinda-100 block text-left mb-1"
            for="user"
            >Usuario</label
          >
          <input
            type="text"
            id="user"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dorado-100)]"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>

        <div class="space-y-2">
          <label
            class="cuerpo-2 text-guinda-100 block text-left mb-1"
            for="pass"
            >Contraseña</label
          >
          <input
            type="password"
            id="pass"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dorado-100)]"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <div class="pt-4">
          <router-link to="/">
            <Boton variant="primario" size="large" class="w-full"
              >Ingresar</Boton
            >
          </router-link>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>
