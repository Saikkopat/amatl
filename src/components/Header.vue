<template>
  <header class="py-1 bg-[var(--marfil)] text-[var(--gris-100)] px-6">
    <div class="container mx-auto">
      <div class="grid grid-cols-4 gap-4">
        <!-- Corazón CDMX - Ocupa columna 1 -->
        <div class="md:hidden flex items-center">
          <img
            src="../assets/icons/Glifo.svg"
            alt="CDMX"
            class="w-10"
          />
        </div>
        
        <!-- Logotipo CDMX - Ocupa columnas 2 y 3 -->
        <div class="col-span-2 flex items-center justify-center">
          <img
            src="../assets/icons/logo-sapci-cdmx-horizontal.svg"
            alt="CDMX"
            class="mx-auto max-w-full md:w-100"
          />
        </div>
        
        <!-- Links de la dependencia - Solo visible en desktop -->
        <div class="hidden md:flex items-center">
          <span class="subtitulo-1 text-[var(--gris-100)]">Transparencia</span>
        </div>
        
        <!-- Menu hamburguesa - Ocupa columna 4 -->
        <div class="flex items-center justify-end md:hidden">
          [| | |]
        </div>
      </div>
    </div>
  </header>
</template>
