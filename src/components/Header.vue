<template>
  <header class="py-1 bg-[var(--marfil)] text-[var(--gris-100)] px-6">
    <div class="container mx-auto">
      <div class="grid grid-cols-4">
        <!-- Corazón CDMX -->
        <div class="md:hidden">
          <img
            src="../assets/icons/Glifo.svg"
            alt="CDMX"
            class="mx-auto w-10"
          />
        </div>
        <!-- Logotipo CDMX -->
        <div>
            <img
            src="../assets/icons/logo-cdmx-horizontal.svg"
            alt="CDMX"
            class="mx-auto"
          />
        </div>
        <!-- Texto dependencia -->
        <div class="titulo-2">
            <span class="text-[var(--guinda-100)]">
                NOMBRE COMPLETO DE LA DEPENDENCIA
            </span>
        </div>
        <!-- Barra busqueda -->
        <div class="sm:hidden">
            <textarea name="BarraBusquedaHeader bg-[var(--blanco)]" id="barraBusquedaHeader" placeholder="Buscar"></textarea>
        </div>

        <!-- Menu hamburguesa -->
         <div class="md:hidden">
            [| | |]
        </div>
        <!-- Links de la dependencia -->
        <div class="">
            <span class="subtitulo-1 text-[var(--gris-100)]">Transparencia</span>
        </div>
      </div>
    </div>
  </header>
</template>
