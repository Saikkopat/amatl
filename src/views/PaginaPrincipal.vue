<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Card from "../components/Card.vue";
import Boton from "../components/Boton.vue";
import Mapa from "./Mapa.vue";
</script>

<template>
  <Header variante="normal" />

  <div class="min-h-screen flex flex-col">
    <main
      class="flex-grow mx-auto px-[var(--espacio-16)] py-[var(--espacio-24)] w-full max-w-7xl space-y-[var(--espacio-24)]"
    >
      <!-- Título principal -->
      <h1
        class="text-center titulo-1 mb-[var(--espacio-24)] text-guinda-100"
      >
        ¡Bienvenido al portal de reportes!
      </h1>

      <!-- Sección de tarjetas -->
      <section class="space-y-[var(--espacio-24)]">
        <h2
          class="text-[var(--titulo-2-size)] leading-[var(--titulo-2-leading)] font-[var(--font-titulo)] text-center"
        >
          Nuestros programas sociales
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-[var(--espacio-24)]">
          <Card>
            <template #titulo>Programa de Alimentación Escolar</template>
            <template #descripcion>
              Apoyo nutricional para estudiantes de educación básica en
              situación vulnerable.
            </template>
            <template #boton>Más información</template>
          </Card>

          <Card>
            <template #titulo>Becas Educativas</template>
            <template #descripcion>
              Apoyo económico para continuar estudios de nivel medio superior y
              superior.
            </template>
            <template #boton>Convocatorias</template>
          </Card>
        </div>
      </section>

      <!-- CTA Principal -->
       <p class="titulo-2 text-center text-dorado-100">Auxilio Escolar</p>
      <div class="bg-marfil p-3 shadow">
        <div class="text-center mb-5">
        <router-link to="/auxilio-escolar/llegada">
          <Boton
            variante="primario"
            tamano="grande"
            class="w-full md:w-auto px-[var(--espacio-48)]"
          >
            Auxilio Escolar: Llegada
          </Boton>
        </router-link>
      </div>

      <div class="text-center">
        <router-link to="/auxilio-escolar/termino">
          <Boton
            variante="primario"
            tamano="grande"
            class="w-full md:w-auto px-[var(--espacio-48)]"
          >
            Auxilio Escolar: Término
          </Boton>
        </router-link>
      </div>
      </div>

      <!-- Mapa interactivo -->
      <section class="mb-8 py-5">
        <p
          class="text-center titulo-2 text-dorado-100 mb-3"
        >
          Colonias de la Ciudad de México
      </p>
        <Mapa
          class="rounded-[var(--border-radio-4)] border border-gris-20 shadow-md"
        />
      </section>
    </main>
  </div>
  <Footer class="mt-auto" />
</template>
