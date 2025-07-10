<script setup>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
</script>
<template>
  <Header variant="normal" />

  <main class="container grid grid-cols-12 gap-x-4 mx-auto px-4">
    <h1
      class="text-center col-span-12 titulo-1 font-bold text-guinda-100 my-8 md:my-12"
    >
      Llegada
    </h1>

    <div
      class="text-gris-100 col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 bg-marfil border-radio-4"
    >
      <div class="p-2 titulo-2">
        <div class="border-radio-4 p-3">
          <FormKit
            type="radio"
            name="confirmacion"
            label="¿Tu escuela tiene clases?"
            :options="['Sí', 'No']"
          />
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>
