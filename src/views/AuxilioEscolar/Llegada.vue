<script setup>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import { Field } from 'vee-validate';

const options = [
  { label: 'Sí', value: 'yes' },
  { label: 'No', value: 'no' }
];
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
          <label class="block mb-2">¿Tu escuela tiene clases?</label>
          <div class="space-y-2">
            <Field
              v-for="option in options"
              :key="option.value"
              name="confirmacion"
              type="radio"
              :value="option.value"
              v-slot="{ field }"
              class="mr-2"
            >
              <label class="inline-flex items-center">
                <input
                  v-bind="field"
                  type="radio"
                  class="form-radio text-guinda-100 focus:ring-guinda-100"
                >
                <span class="ml-2">{{ option.label }}</span>
              </label>
            </Field>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>