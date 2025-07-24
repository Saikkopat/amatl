<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Boton from "@/components/Boton.vue";
import GeoLocalizacion from "@/components/GeoLocalizacion.vue";
import { Field } from "vee-validate";
import incidencias from "@/assets/data/incidencias.json";
import gestiones from "@/assets/data/gestiones.json";
import personas from "@/assets/data/personas.json";
import Repeater from "@/components/Repeater.vue";
import VueTimepicker from "vue3-timepicker";
import "vue3-timepicker/dist/VueTimepicker.css";

// Opciones para los radio buttons
const options = [
  { label: "Sí", value: "true" },
  { label: "No", value: "false" },
];

// Datos del formulario
const formData = ref({
  gestionesUrbanas: null, // 'true' o 'false'
  incidencias: null, // 'true' o 'false'
  gestiones: [], // Array de gestiones
  incidentes: [], // Array de incidencias
  comunicacion: [], // Array de personas con las que se comunicó
  ubicacion: null, // Datos de geolocalización
  horaTermino: "", // Hora de salida
});

// Manejo de coordenadas
const handleCoords = (coords) => {
  formData.value.ubicacion = coords;
};

// Actualizar selección de gestiones urbanas
const updateGestionesSelection = (value) => {
  formData.value.gestionesUrbanas = value;
  if (value === "false") {
    formData.value.gestiones = [];
  }
};

// Actualizar selección de incidencias
const updateIncidenciasSelection = (value) => {
  formData.value.incidencias = value;
  if (value === "false") {
    formData.value.incidentes = [];
  }
};

// Actualizar comunicación con personas
const toggleComunicacion = (value) => {
  const index = formData.value.comunicacion.indexOf(value);
  if (index === -1) {
    formData.value.comunicacion.push(value);
  } else {
    formData.value.comunicacion.splice(index, 1);
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header variant="normal" />

    <main class="flex-grow container mx-auto px-4 max-w-2xl py-8">
      <div class="text-center mb-8 md:mb-12">
        <h1 class="titulo-1 text-guinda-100 mb-4">Término</h1>
        <p class="cuerpo-2 text-gris-80">Por favor registra tu salida.</p>
      </div>

      <div class="bg-marfil border-radio-4 sombra p-6 mb-8">
        <!-- Hora de salida -->
        <div class="space-y-4 mb-8">
          <p class="h2 titulo-2 text-gris-100">Hora de salida</p>
          <p class="cuerpo-2 text-gris-80">
            Registra la hora en la que terminaste tu jornada.
          </p>
          <p class="cuerpo-3 text-gris-80">
            Formato 24 horas, intervalos de 10 minutos.
          </p>
          <VueTimepicker
            v-model="formData.horaTermino"
            format="HH:mm"
            minute-interval="10"
            @change="(val) => (formData.horaTermino = val)"
          />
        </div>
        <!-- Gestiones urbanas -->
        <div class="space-y-4 mb-8">
          <p class="h2 titulo-2 text-gris-100">Gestiones urbanas</p>
          <p class="cuerpo-2 text-gris-80">
            Algo sobre el folio SUAC. Todavia no sabemos.
          </p>
          <Field
            v-for="option in options"
            :key="option.value"
            name="gestionesUrbanas"
            type="radio"
            :value="option.value"
            v-slot="{ field }"
            @change="updateGestionesSelection(option.value)"
          >
            <div
              class="bg-white border-radio-4 p-4 hover:bg-gris-10 transition-colors"
            >
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

          <Repeater
            v-if="formData.gestionesUrbanas === 'true'"
            :options="gestiones"
            :allow-duplicates="true"
            v-model="formData.gestiones"
          />
        </div>

        <!-- Incidencias -->
        <div class="space-y-4 mb-8">
          <p class="h2 titulo-2 text-gris-100">Incidencias</p>
          <p class="cuerpo-2 text-gris-80">
            Situaciones que ocurrieron durante tu jornada.
          </p>

          <Field
            v-for="option in options"
            :key="option.value"
            name="incidencias"
            type="radio"
            :value="option.value"
            v-slot="{ field }"
            @change="updateIncidenciasSelection(option.value)"
          >
            <div
              class="bg-white border-radio-4 p-4 hover:bg-gris-10 transition-colors"
            >
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

          <Repeater
            v-if="formData.incidencias === 'true'"
            :options="incidencias"
            :allow-duplicates="false"
            v-model="formData.incidentes"
          />
        </div>

        <!-- Comunicación con la comunidad -->
        <div class="space-y-4 mb-8">
          <p class="h2 titulo-2 text-gris-100">Comunicación con la comunidad</p>
          <p class="cuerpo-2 text-gris-80">
            Personas con las que mantuviste comunicación durante tu jornada.
          </p>

          <div class="space-y-2">
            <div
              v-for="(label, value) in personas"
              :key="value"
              class="bg-white border-radio-4 p-4 hover:bg-gris-10 transition-colors"
            >
              <label class="flex items-center espacio-8 cursor-pointer">
                <input
                  type="checkbox"
                  :value="value"
                  :checked="formData.comunicacion.includes(value)"
                  @change="toggleComunicacion(value)"
                  class="form-checkbox h-5 w-5 text-guinda-100 rounded focus:ring-guinda-100 border-2"
                />
                <span class="cuerpo-2 text-gris-100 ml-2">{{ label }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Ubicación -->
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

      <!-- Solo para debug -->
      <pre class="text-black">{{ formData }}</pre>
    </main>

    <Footer />
  </div>
</template>
