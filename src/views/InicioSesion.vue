<script setup>
import Boton from "../components/Boton.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // Importamos el store de Pinia

const form = ref({
  username: "",
  password: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const router = useRouter();
const authStore = useAuthStore(); // Instanciamos el store

const submitLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await authStore.login({
      username: form.value.username,
      password: form.value.password,
    });

    // Verifica que el usuario esté autenticado antes de redirigir
    if (authStore.user) {
      router.push("/"); // Redirige a la página principal
    } else {
      throw new Error("Autenticación fallida");
    }
  } catch (error) {
    console.error("Error en login:", error);
    errorMessage.value = error.message.includes("401")
      ? "Usuario o contraseña incorrectos"
      : error.message || "Error en el servidor";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Header variant="titulo" />
  <div
    class="container px-5 mx-auto h-120 flex items-center justify-center text-gris-100"
  >
    <div
      class="card container bg-marfil text-center p-6 rounded-lg shadow-md max-w-md"
    >
      <h1 class="titulo-1 mb-6">Inicio de sesión</h1>

      <form @submit.prevent="submitLogin" class="cuerpo-1 mx-auto space-y-4">
        <!-- Mensaje de error -->
        <div v-if="errorMessage" class="text-red-500 cuerpo-2">
          {{ errorMessage }}
        </div>

        <div class="space-y-2">
          <label
            class="cuerpo-2 text-guinda-100 block text-left mb-1"
            for="user"
          >
            Usuario
          </label>
          <input
            v-model="form.username"
            type="text"
            id="user"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dorado-100)]"
            placeholder="Ingresa tu usuario"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="space-y-2">
          <label
            class="cuerpo-2 text-guinda-100 block text-left mb-1"
            for="pass"
          >
            Contraseña
          </label>
          <input
            v-model="form.password"
            type="password"
            id="pass"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--dorado-100)]"
            placeholder="Ingresa tu contraseña"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="pt-4">
          <Boton
            variant="primario"
            size="large"
            class="w-full"
            type="submit"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Ingresar</span>
            <span v-else>Procesando...</span>
          </Boton>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>
