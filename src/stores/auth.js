import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api/axios";
import { useRouter } from "vue-router";
import jwtDecode from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const router = useRouter();

  // Función para cargar datos desde localStorage
  const loadFromStorage = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      token.value = storedToken;
      try {
        user.value = storedUser ? JSON.parse(storedUser) : null;
      } catch (e) {
        console.error("Error parsing user data:", e);
        user.value = null;
      }
    }
  };

  // Cargar datos al inicializar el store
  loadFromStorage();

  const login = async (credentials) => {
    try {
      const response = await api.post("login/", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data && response.data.access) {
        // <-- Ahora busca 'access' directamente
        token.value = response.data.access;
        user.value = jwtDecode(token.value);

        localStorage.setItem("token", token.value);
        localStorage.setItem("user", JSON.stringify(user.value));

        return response.data; // Devuelve los tokens para posible uso adicional
      }
      throw new Error("Respuesta inesperada del servidor");
    } catch (error) {
      // Mejora el manejo de errores
      let message = "Error en el login";
      if (error.response) {
        message =
          error.response.data?.error ||
          error.response.data?.detail ||
          (error.response.status === 401 ? "Credenciales inválidas" : message);
      }
      throw new Error(message);
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return {
    user,
    token,
    login,
    logout,
    loadFromStorage, // Ahora está definida correctamente
  };
});
