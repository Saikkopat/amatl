<script setup>
import { ref } from 'vue';

defineProps({
  variant: {
    type: String,
    default: 'normal',
    validator: (v) => ['normal', 'titulo'].includes(v)
  }
});

const isMenuOpen = ref(false);
const menuItems = ['Inicio', 'Recursos', 'Reportes', 'Perfil'];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto';
};
</script>

<template>
  <header class="py-1 bg-[var(--marfil)] text-[var(--gris-100)] px-6">
    <div v-if="variant === 'normal'" class="container mx-auto">
      <div class="grid grid-cols-4 gap-4">
        <!-- Menú Hamburguesa - Ocupa columna 1 -->
        <div class="flex items-center justify-start md:hidden">
          <button 
            @click="toggleMenu"
            class="p-2 focus:outline-none group"
            aria-label="Menú"
          >
            <div class="w-6 flex flex-col space-y-1.5">
              <span class="h-0.5 w-full bg-[var(--gris-100)] transition-all duration-300 group-hover:bg-[var(--guinda-100)]"
                :class="{'transform rotate-45 translate-y-2': isMenuOpen}"></span>
              <span class="h-0.5 w-full bg-[var(--gris-100)] transition-all duration-300 group-hover:bg-[var(--guinda-100)]"
                :class="{'opacity-0': isMenuOpen}"></span>
              <span class="h-0.5 w-full bg-[var(--gris-100)] transition-all duration-300 group-hover:bg-[var(--guinda-100)]"
                :class="{'transform -rotate-45 -translate-y-2': isMenuOpen}"></span>
            </div>
          </button>

          <!-- Overlay con transición -->
          <transition name="fade">
            <div 
              v-if="isMenuOpen"
              @click="toggleMenu"
              class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            ></div>
          </transition>

          <!-- Menú Desplegable con animación -->
          <transition name="slide">
            <div 
              v-if="isMenuOpen"
              class="fixed inset-y-0 left-0 z-50 bg-[var(--marfil)] w-4/5 max-w-sm shadow-2xl"
            >
              <div class="h-full flex flex-col">
                <!-- Cabecera del menú móvil -->
                <div class="p-4 flex justify-between items-center border-b border-[var(--gris-30)]">
                  <img
                    src="../assets/icons/logo-sapci-cdmx-horizontal.svg"
                    alt="CDMX"
                    class="h-8"
                  />
                  <button 
                    @click="toggleMenu"
                    class="text-[var(--gris-100)] text-2xl transition-all duration-200 hover:text-[var(--guinda-100)] hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
                
                <!-- Opciones del menú con animación escalonada -->
                <nav class="flex-1 p-4 overflow-y-auto">
                  <ul class="space-y-2">
                    <li v-for="(item, index) in menuItems" :key="item">
                      <transition
                        appear
                        :css="false"
                        @before-enter="(el) => {
                          el.style.opacity = 0;
                          el.style.transform = 'translateX(-20px)';
                          el.style.transitionDelay = `${index * 0.1}s`;
                        }"
                        @enter="(el) => {
                          el.style.opacity = 1;
                          el.style.transform = 'translateX(0)';
                        }"
                      >
                        <a 
                          href="#"
                          class="subtitulo-1 text-[var(--gris-100)] block py-3 px-4 rounded-lg transition-all duration-300
                                 hover:bg-[var(--guinda-100)] hover:text-white hover:pl-6"
                        >
                          {{ item }}
                        </a>
                      </transition>
                    </li>
                  </ul>
                </nav>
                
                <!-- Footer del menú móvil -->
                <div class="p-4 border-t border-[var(--gris-30)]">
                  <img
                    src="../assets/icons/Glifo.svg"
                    alt="CDMX"
                    class="w-8 mx-auto transition-all duration-200 hover:scale-110 hover:filter hover:brightness-90"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Resto del header... -->
        <div class="col-span-2 flex items-center justify-center">
          <img
            src="../assets/icons/logo-sapci-cdmx-horizontal.svg"
            alt="CDMX"
            class="mx-auto w-100"
          />
        </div>
        
        <div class="hidden md:flex justify-around items-center">
          <a 
            v-for="item in menuItems" 
            :key="item"
            href="#"
            class="subtitulo-1 text-[var(--gris-100)] px-3 py-1 rounded-lg transition-colors duration-200
                   hover:bg-[var(--guinda-100)] hover:text-white"
          >
            {{ item }}
          </a>
        </div>
        
        <div class="md:hidden flex justify-end">
          <img
            src="../assets/icons/Glifo.svg"
            alt="CDMX"
            class="w-10 transition-all duration-200 hover:filter hover:brightness-90"
          />
        </div>
      </div>
    </div>
    
    <div v-if="variant === 'titulo'" class="container mx-auto">
      <div class="col-span-2 flex items-center justify-center">
        <img
          src="../assets/icons/logo-sapci-cdmx-horizontal.svg"
          alt="CDMX"
          class="mx-auto max-w-full md:w-100"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Animación para el overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animación para el menú deslizante */
.slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Efecto hover para el glifo */
.hover\:brightness-90:hover {
  filter: brightness(90%);
}
</style>