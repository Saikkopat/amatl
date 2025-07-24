<template>
  <button
    :class="[
      'btn',
      `btn--${variante}`,
      `btn--${tamano}`,
      { 
        'btn--deshabilitado': deshabilitado,
        'btn--cargando': cargando,
        'btn--bloque': bloque
      }
    ]"
    :disabled="deshabilitado || cargando"
    :aria-busy="cargando ? 'true' : 'false'"
    :aria-disabled="deshabilitado ? 'true' : 'false'"
    @click="manejarClick"
    :type="tipo"
  >
    <span v-if="cargando" class="btn__cargador" aria-hidden="true"></span>
    <span class="btn__contenido" :class="{ 'opacity-0': cargando }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);

const props = defineProps({
  variante: {
    type: String,
    default: 'primario',
    validator: (v) => ['primario', 'secundario', 'terciario', 'peligro', 'exito'].includes(v)
  },
  tamano: {
    type: String,
    default: 'mediano',
    validator: (v) => ['pequeno', 'mediano', 'grande'].includes(v)
  },
  deshabilitado: {
    type: Boolean,
    default: false
  },
  cargando: {
    type: Boolean,
    default: false
  },
  bloque: {
    type: Boolean,
    default: false,
    description: 'Hace que el botón ocupe todo el ancho disponible'
  },
  tipo: {
    type: String,
    default: 'button',
    validator: (v) => ['button', 'submit', 'reset'].includes(v)
  }
});

const manejarClick = (e) => {
  if (!props.deshabilitado && !props.cargando) {
    emit('click', e);
  }
};
</script>

<style>
.btn {
  font-family: inherit;
  font-weight: bold;
  transition: all 200ms ease;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radio-4);
}

/* Fuentes específicas */
.btn--primario {
  font-family: var(--font-titulo);
}
.btn--secundario,
.btn--terciario,
.btn--peligro,
.btn--exito {
  font-family: var(--font-contenido);
}

/* Variantes de color */
.btn--primario {
  background-color: var(--color-guinda-100);
  color: var(--color-blanco);
}
.btn--primario:hover:not(.btn--deshabilitado, .btn--cargando) {
  background-color: var(--color-rojo-50);
  color: var(--color-rojo-100);
}
.btn--primario:focus {
  box-shadow: 0 0 0 2px var(--color-guinda-100);
}

.btn--secundario {
  background-color: var(--color-amarillo-50);
  color: var(--color-gris-100);
  border: 1px solid var(--color-dorado-100);
}
.btn--secundario:hover:not(.btn--deshabilitado, .btn--cargando) {
  background-color: var(--color-gris-40);
}

.btn--terciario {
  background-color: transparent;
  color: var(--color-gris-100);
  border: 1px solid var(--color-gris-40);
}
.btn--terciario:hover:not(.btn--deshabilitado, .btn--cargando) {
  background-color: var(--color-gris-10);
  box-shadow: var(--sombra);
}

.btn--peligro {
  background-color: var(--color-rojo-100);
  color: var(--color-blanco);
}
.btn--peligro:hover:not(.btn--deshabilitado, .btn--cargando) {
  background-color: var(--color-rojo-50);
}

.btn--exito {
  background-color: var(--color-verde-100);
  color: var(--color-blanco);
}
.btn--exito:hover:not(.btn--deshabilitado, .btn--cargando) {
  background-color: var(--color-verde-50);
}

/* Tamaños */
.btn--pequeno {
  padding: var(--espacio-8) var(--espacio-16);
  font-size: var(--cuerpo-3-size);
}

.btn--mediano {
  padding: var(--espacio-16) var(--espacio-24);
  font-size: var(--cuerpo-2-size);
}

.btn--grande {
  padding: var(--espacio-24) var(--espacio-48);
  font-size: var(--cuerpo-1-size);
}

/* Estados */
.btn--deshabilitado {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--bloque {
  width: 100%;
}

/* Spinner de carga */
.btn__cargador {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>