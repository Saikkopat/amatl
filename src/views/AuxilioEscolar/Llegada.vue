<script setup>
import Header from '@/components/Header.vue';
import Footer from "@/components/Footer.vue";
import Boton from "@/components/Boton.vue";
import GeoLocalizacion from "@/components/GeoLocalizacion.vue";
import { Field } from 'vee-validate';

const options = [
  { label: 'Sí', value: 'yes' },
  { label: 'No', value: 'no' }
];
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header variant="normal" />
    
    <main class="flex-grow container mx-auto px-4 max-w-2xl py-8">
      <div class="text-center mb-8 md:mb-12">
        <h1 class="titulo-1 text-guinda-100 mb-4">
          Llegada
        </h1>
        <p class="cuerpo-2 text-gris-80">Por favor registra tu llegada.</p>
      </div>

      <div class="bg-marfil border-radio-4 sombra p-6 mb-8">
        <h2 class="titulo-2 text-gris-100 mb-6">
          ¿Tu escuela tuvo clases?
        </h2>
        
        <div class="space-y-4 mb-8">
          <Field
            v-for="option in options"
            :key="option.value"
            name="confirmacion"
            type="radio"
            :value="option.value"
            v-slot="{ field }"
          >
            <div class="bg-white border-radio-4 p-4 hover:bg-gris-10 transition-colors">
              <label class="flex items-center espacio-8 cursor-pointer">
                <input
                  v-bind="field"
                  type="radio"
                  class="form-radio h-5 w-5 text-guinda-100 focus:ring-guinda-100 border-2"
                />
                <span class="cuerpo-2 text-gris-100">{{ option.label }}</span>
              </label>
            </div>
          </Field>
        </div>

        <div class="bg-marfil border-radio-4 sombra p-6 mb-8">
        <h2 class="subtitulo-1 text-gris-100 mb-6">Ubicación Actual</h2>
        <GeoLocalizacion @coords-updated="handleCoords" />
        </div>
        
        <div class="text-center mt-8">
          <Boton variante="primario" tamano="grande" @click="confirmar">
            Confirmar Registro
          </Boton>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>