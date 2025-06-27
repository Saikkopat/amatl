<template>
  <footer class="py-4 bg-[var(--guinda-100)] text-[var(--marfil)] px-6">
    <div class="contenedor mx-auto">
      <!-- Logo de la CDMX e iconos de redes sociales. -->
      <div class="grid grid-cols-2">
        <div>
          <img
            src="../assets/icons/logo-cdmx-dark-horizontal.svg"
            alt="CDMX"
            class="w-60 h-auto"
          />
        </div>
        <div class="flex gap-6 justify-end my-auto">
          <a href="https://www.facebook.com/GobiernoCDMX/" target="_blank">
            <img src="../assets/icons/fb.svg" alt="Facebook" class=" w-5 h-5">
          </a>
          <a href="https://www.instagram.com/gobiernocdmx/?hl=es" target="_blank">
            <img src="../assets/icons/instagram.svg" alt="Instagram" class=" w-5 h-5">
          </a>
          <a href="https://x.com/GobCDMX" target="_blank">
            <img src="../assets/icons/x.svg" alt="X/Twitter" class=" w-5 h-5">
          </a>
          <a href="https://www.tiktok.com/@gobcdmx?lang=es" target="_blank">
            <img src="../assets/icons/tiktok.svg" alt="TikTok" class=" w-5 h-5">
          </a>
        </div>
      </div>
      <!-- Enlaces a portales de atencion ciudadana, transparencia y opcional 1 -->
      <div class="grid md:grid-cols-5 py-5">
        <div class="cuerpo-2">Enlace 1</div>
        <div class="cuerpo-2">Enlace 2</div>
        <div class="cuerpo-2">Enlace 3</div>
      </div>
      <!-- Direcciones, por defecto viene incluido la de Atencion Ciudadana. -->
       <div class="pt-3 cuerpo-3">
        Atención Ciudadana, Dr. Lavista 144, Colonia Doctores, Alcaldía Cuauhtémoc, C.P. 06720.
       </div>
       <div class="pb-3 cuerpo-3">
        Dependencia 2, Dirección 2.
       </div>
       <!-- Politica de privacidad y terminos y condiciones -->
       <div class="grid grid-cols-4 cuerpo-3">
        <div>Politica de privacidad</div>
        <div>Terminos y condiciones</div>
        <div>SAPCI/CTGIETyE 2025 <span class="italic">amatl</span> v.0.1.0</div>
       </div>
    </div>
  </footer>
</template>