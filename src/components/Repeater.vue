<script setup>
import { ref, watch } from 'vue';
import Boton from './Boton.vue'; // Asegúrate de que la ruta sea correcta

const props = defineProps({
  options: Object,
  allowDuplicates: Boolean,
  modelValue: Array
});

const emit = defineEmits(['update:modelValue']);

const items = ref(props.modelValue?.length ? [...props.modelValue] : [{ tipo: '', descripcion: '' }]);

watch(items, (newItems) => {
  emit('update:modelValue', newItems.filter(item => item.tipo));
}, { deep: true });
</script>

<template>
  <div class="repeater space-y-4">
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      class="item p-4 border border-gris-40 rounded-[var(--border-radio-4)] bg-gris-10 space-y-3"
    >
      <select 
        v-model="item.tipo"
        class="w-full p-2 border border-gris-40 rounded-[var(--border-radio-4)] bg-blanco font-[var(--font-contenido)] text-gris-100 focus:ring-2 focus:ring-guinda-100 focus:border-transparent"
      >
        <option value="" disabled class="text-gris-60">Selecciona...</option>
        <option 
          v-for="(label, value) in options" 
          :key="value"
          :value="value"
          :disabled="!allowDuplicates && items.some(i => i.tipo === value && i !== item)"
          class="text-gris-100"
        >
          {{ label }}
        </option>
      </select>
      
      <textarea 
        v-model="item.descripcion" 
        placeholder="Descripción"
        class="w-full p-2 border border-gris-40 rounded-[var(--border-radio-4)] bg-blanco font-[var(--font-contenido)] text-gris-100 focus:ring-2 focus:ring-guinda-100 focus:border-transparent min-h-[80px]"
      ></textarea>
      
      <Boton 
        v-if="items.length > 1" 
        @click="items.splice(index, 1)"
        tipo="button"
        variante="terciario" 
        tamano="pequeno"
        class="mt-2"
      >
        Eliminar
      </Boton>
    </div>
    
    <Boton 
      @click="items.push({ tipo: '', descripcion: '' })"
      tipo="button"
      variante="secundario" 
      tamano="mediano"
      :deshabilitado="!allowDuplicates && items.length >= Object.keys(options).length"
    >
      Agregar
    </Boton>
  </div>
</template>

<style>
.repeater {
  font-family: var(--font-contenido);
}

/* Transiciones suaves */
select, textarea, .item {
  transition: all 0.2s ease;
}

/* Estilo para opciones deshabilitadas */
select option:disabled {
  color: var(--color-gris-60);
  background-color: var(--color-gris-20);
}

/* Estilo para el hover en items */
.item:hover {
  background-color: var(--color-gris-20);
}
</style>