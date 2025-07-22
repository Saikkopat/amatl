<script setup>
import Header from '@/components/Header.vue';
import Footer from "@/components/Footer.vue";
import GeoLocalizacion from "@/components/GeoLocalizacion.vue";
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

// Manejo de coordenadas
const handleCoords = (coords) => {
  console.log('Coordenadas recibidas:', coords);
  formData.value.latitude = coords.lat;
  formData.value.longitude = coords.lng;
};

// Datos del formulario
const formData = ref({
  horaTermino: '',
  gestionesUrbanas: 'no',
  incidencias: 'no',
  gestiones: [],
  incidentes: [],
  comunicacion: [],
  latitude: null,
  longitude: null
});

// Reglas de validación corregidas
const rules = {
  formData: {
    horaTermino: { required },
    gestionesUrbanas: { required },
    incidencias: { required },
    gestiones: {
      $each: {
        tipo: { required },
        folio: { required }
      }
    },
    incidentes: {
      $each: {
        tipo: { required },
        descripcion: { required }
      }
    }
  }
};

const v$ = useVuelidate(rules, { formData });

// Métodos para manejar formularios dinámicos
const agregarGestion = () => {
  formData.value.gestiones.push({ tipo: '', folio: '' });
};

const eliminarGestion = (index) => {
  if (formData.value.gestiones.length > 1) {
    formData.value.gestiones.splice(index, 1);
  }
};

const agregarIncidencia = () => {
  formData.value.incidentes.push({ tipo: '', descripcion: '' });
};

const eliminarIncidencia = (index) => {
  if (formData.value.incidentes.length > 1) {
    formData.value.incidentes.splice(index, 1);
  }
};

const toggleComunicacion = (value) => {
  const index = formData.value.comunicacion.indexOf(value);
  if (index === -1) {
    formData.value.comunicacion.push(value);
  } else {
    formData.value.comunicacion.splice(index, 1);
  }
};

const onSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    console.log('Formulario válido:', formData.value);
    // Aquí iría la lógica para enviar el formulario
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header variant="normal" />
    
    <main class="flex-grow container mx-auto px-4 max-w-2xl py-8">
      <div class="text-center mb-8 md:mb-12">
        <h1 class="titulo-1 text-guinda-100 mb-4">
          Término
        </h1>
        <p class="cuerpo-2 text-gris-80">Por favor registra tu salida.</p>
      </div>

      <form @submit.prevent="onSubmit" class="bg-marfil border-radio-4 sombra p-6 mb-8">
        <!-- Hora de Término -->
        <div class="mb-8">
          <h2 class="subtitulo-1 text-gris-100 mb-4">Hora de término</h2>
          <p class="cuerpo-2 text-gris-80 mb-4">La hora cuando terminaron tus actividades en el plantel.</p>
          
          <div class="relative">
            <input 
              v-model="formData.horaTermino"
              type="time"
              class="form-input w-full p-3 border border-gris-30 rounded-md focus:border-guinda-100 focus:ring focus:ring-guinda-50"
              :class="{ 'border-rojo-100': v$.formData.horaTermino.$error }"
            />
            <span 
              v-if="v$.formData.horaTermino.$error" 
              class="error-message cuerpo-3 text-rojo-100 mt-1 block"
            >
              Por favor, ingresa la hora de término.
            </span>
          </div>
        </div>

        <hr class="border-t border-gris-20 my-6">

        <!-- Gestiones Urbanas -->
        <div class="mb-8">
          <h2 class="subtitulo-1 text-gris-100 mb-4">Gestiones urbanas</h2>
          <p class="cuerpo-2 text-gris-80 mb-4">Recuerda levantar tu correspondiente folio SUAC en la App CDMX.</p>
          
          <div class="flex space-x-4 mb-4">
            <label class="flex items-center">
              <input 
                v-model="formData.gestionesUrbanas"
                value="si"
                type="radio"
                class="form-radio h-5 w-5 text-guinda-100 focus:ring-guinda-100 border-2"
              />
              <span class="cuerpo-2 text-gris-100 ml-2">Sí</span>
            </label>
            <label class="flex items-center">
              <input 
                v-model="formData.gestionesUrbanas"
                value="no"
                type="radio"
                class="form-radio h-5 w-5 text-guinda-100 focus:ring-guinda-100 border-2"
              />
              <span class="cuerpo-2 text-gris-100 ml-2">No</span>
            </label>
          </div>
          <span 
            v-if="v$.formData.gestionesUrbanas.$error" 
            class="error-message cuerpo-3 text-rojo-100 mt-1 block"
          >
            Por favor, selecciona una opción.
          </span>

          <div v-if="formData.gestionesUrbanas === 'si'" class="space-y-4">
            <div 
              v-for="(gestion, index) in formData.gestiones" 
              :key="index" 
              class="bg-white p-4 rounded-md border border-gris-20"
            >
              <div class="flex items-start gap-2 mb-3">
                <div class="flex-grow">
                  <select 
                    v-model="gestion.tipo"
                    class="form-select w-full p-2 border border-gris-30 rounded-md focus:border-guinda-100 focus:ring focus:ring-guinda-50"
                    :class="{ 'border-rojo-100': v$.formData.gestiones.$each.$response.$errors[index]?.tipo?.length }"
                  >
                    <option value="" disabled selected>Selecciona una gestión</option>
                    <option value="gestión1">Gestión 1</option>
                    <option value="gestión2">Gestión 2</option>
                    <option value="gestión3">Gestión 3</option>
                  </select>
                  <span 
                    v-if="v$.formData.gestiones.$each.$response.$errors[index]?.tipo?.length"
                    class="error-message cuerpo-3 text-rojo-100 mt-1 block"
                  >
                    Por favor, selecciona una gestión.
                  </span>
                </div>
                <button 
                  type="button" 
                  @click="eliminarGestion(index)"
                  class="btn btn-danger p-2 rounded-md"
                  :disabled="formData.gestiones.length <= 1"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <textarea 
                v-model="gestion.folio"
                class="form-textarea w-full p-2 border border-gris-30 rounded-md focus:border-guinda-100 focus:ring focus:ring-guinda-50"
                :class="{ 'border-rojo-100': v$.formData.gestiones.$each.$response.$errors[index]?.folio?.length }"
                rows="2"
                placeholder="Folio SUAC"
              ></textarea>
              <span 
                v-if="v$.formData.gestiones.$each.$response.$errors[index]?.folio?.length"
                class="error-message cuerpo-3 text-rojo-100 mt-1 block"
              >
                Por favor, ingresa el folio SUAC.
              </span>
            </div>

            <button 
              type="button" 
              @click="agregarGestion"
              class="btn btn-warning flex items-center justify-center mx-auto mt-4"
            >
              <i class="bi bi-plus-circle fs-5 me-2"></i>Agregar Gestión
            </button>
          </div>
        </div>

        <hr class="border-t border-gris-20 my-6">

        <!-- Incidencias -->
        <div class="mb-8">
          <h2 class="subtitulo-1 text-gris-100 mb-4">Incidencias</h2>
          <p class="cuerpo-2 text-gris-80 mb-4">Situaciones que ocurrieron durante tu jornada.</p>
          
          <div class="flex space-x-4 mb-4">
            <label class="flex items-center">
              <input 
                v-model="formData.incidencias"
                value="si"
                type="radio"
                class="form-radio h-5 w-5 text-guinda-100 focus:ring-guinda-100 border-2"
              />
              <span class="cuerpo-2 text-gris-100 ml-2">Sí</span>
            </label>
            <label class="flex items-center">
              <input 
                v-model="formData.incidencias"
                value="no"
                type="radio"
                class="form-radio h-5 w-5 text-guinda-100 focus:ring-guinda-100 border-2"
              />
              <span class="cuerpo-2 text-gris-100 ml-2">No</span>
            </label>
          </div>
          <span 
            v-if="v$.formData.incidencias.$error" 
            class="error-message cuerpo-3 text-rojo-100 mt-1 block"
          >
            Por favor, selecciona una opción.
          </span>

          <div v-if="formData.incidencias === 'si'" class="space-y-4">
            <div 
              v-for="(incidente, index) in formData.incidentes" 
              :key="index" 
              class="bg-white p-4 rounded-md border border-gris-20"
            >
              <div class="flex items-start gap-2 mb-3">
                <div class="flex-grow">
                  <select 
                    v-model="incidente.tipo"
                    class="form-select w-full p-2 border border-gris-30 rounded-md focus:border-guinda-100 focus:ring focus:ring-guinda-50"
                    :class="{ 'border-rojo-100': v$.formData.incidentes.$each.$response.$errors[index]?.tipo?.length }"
                  >
                    <option value="" disabled selected>Selecciona una incidencia</option>
                    <option value="incidencia1">Incidencia 1</option>
                    <option value="incidencia2">Incidencia 2</option>
                    <option value="incidencia3">Incidencia 3</option>
                  </select>
                  <span 
                    v-if="v$.formData.incidentes.$each.$response.$errors[index]?.tipo?.length"
                    class="error-message cuerpo-3 text-rojo-100 mt-1 block"
                  >
                    Por favor, selecciona una incidencia.
                  </span>
                </div>
                <button 
                  type="button" 
                  @click="eliminarIncidencia(index)"
                  class="btn btn-danger p-2 rounded-md"
                  :disabled="formData.incidentes.length <= 1"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <textarea 
                v-model="incidente.descripcion"
                class="form-textarea w-full p-2 border border-gris-30 rounded-md focus:border-guinda-100 focus:ring focus:ring-guinda-50"
                :class="{ 'border-rojo-100': v$.formData.incidentes.$each.$response.$errors[index]?.descripcion?.length }"
                rows="2"
                placeholder="Descripción detallada..."
              ></textarea>
              <span 
                v-if="v$.formData.incidentes.$each.$response.$errors[index]?.descripcion?.length"
                class="error-message cuerpo-3 text-rojo-100 mt-1 block"
              >
                Por favor, ingresa una descripción detallada.
              </span>
            </div>

            <button 
              type="button" 
              @click="agregarIncidencia"
              class="btn btn-warning flex items-center justify-center mx-auto mt-4"
            >
              <i class="bi bi-plus-circle fs-5 me-2"></i>Agregar Incidencia
            </button>
          </div>
        </div>

        <hr class="border-t border-gris-20 my-6">

        <!-- Comunicación con la comunidad -->
        <div class="mb-8">
          <h2 class="subtitulo-1 text-gris-100 mb-4">Comunicación con la comunidad</h2>
          <p class="cuerpo-2 text-gris-80 mb-4">Personas con las que mantuviste comunicación durante tu jornada.</p>
          
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                :checked="formData.comunicacion.includes('1')"
                @change="toggleComunicacion('1')"
                class="form-checkbox h-5 w-5 text-guinda-100 rounded focus:ring-guinda-100 border-2"
              />
              <span class="cuerpo-2 text-gris-100 ml-2">Jefe de Sector</span>
            </label>
            <label class="flex items-center">
              <input 
                type="checkbox" 
                :checked="formData.comunicacion.includes('2')"
                @change="toggleComunicacion('2')"
                class="form-checkbox h-5 w-5 text-guinda-100 rounded focus:ring-guinda-100 border-2"
              />
              <span class="cuerpo-2 text-gris-100 ml-2">Autoridades Escolares</span>
            </label>
            <!-- Continuar con las demás opciones... -->
          </div>
        </div>

        <hr class="border-t border-gris-20 my-6">

        <!-- Ubicación -->
        <div class="mb-8">
          <h2 class="subtitulo-1 text-gris-100 mb-4">Ubicación Actual</h2>
          <GeoLocalizacion @coords-updated="handleCoords" />
        </div>

        <div class="text-center mt-8">
          <button
            type="submit"
            class="btn btn-primario btn-medium mx-auto bg-guinda-100 text-gris-20"
          >
            <i class="bi bi-send-check-fill me-2"></i> Enviar
          </button>
        </div>
      </form>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-input,
.form-select,
.form-textarea {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #800020;
  box-shadow: 0 0 0 0.2rem rgba(128, 0, 32, 0.25);
}

.border-rojo-100 {
  border-color: #dc3545;
}
</style>