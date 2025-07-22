<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Solución para el icono marker de Leaflet
const initLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

initLeafletIcons();

const emit = defineEmits(['coords-updated']);

const state = ref({
  loading: true,
  error: null,
  coords: null,
  accuracy: null
});

let mapInstance = null;
let markerInstance = null;

const initMap = (position) => {
  // Esperamos a que el DOM esté listo
  nextTick(() => {
    const container = document.getElementById('miniMap');
    if (!container) {
      state.value.error = 'Error al inicializar el mapa: contenedor no encontrado';
      return;
    }

    if (container._leaflet_map) {
      container._leaflet_map.remove();
    }

    const userLocation = [position.coords.latitude, position.coords.longitude];
    
    mapInstance = L.map('miniMap', {
      center: userLocation,
      zoom: 16,
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ''
    }).addTo(mapInstance);

    markerInstance = L.marker(userLocation).addTo(mapInstance);

    // Forzar redimensionamiento después de un breve retraso
    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 100);

    emit('coords-updated', {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy
    });
  });
};

const handleGeolocationError = (error) => {
  let message = 'Error al obtener la ubicación';
  switch(error.code) {
    case error.PERMISSION_DENIED:
      message = 'Debe habilitar GPS para continuar. Actualice la página y permita el acceso a la ubicación.';
      break;
    case error.POSITION_UNAVAILABLE:
      message = 'La información de ubicación no está disponible.';
      break;
    case error.TIMEOUT:
      message = 'Tiempo de espera para obtener ubicación agotado.';
      break;
  }
  state.value = { 
    loading: false, 
    error: message,
    coords: null,
    accuracy: null
  };
};

const getLocation = () => {
  state.value = { 
    loading: true, 
    error: null,
    coords: null,
    accuracy: null
  };

  if (!navigator.geolocation) {
    state.value = { 
      loading: false, 
      error: 'Geolocalización no es soportada por tu navegador.',
      coords: null,
      accuracy: null
    };
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      state.value = { 
        loading: false, 
        error: null,
        coords: [position.coords.latitude, position.coords.longitude],
        accuracy: position.coords.accuracy
      };
      initMap(position);
    },
    handleGeolocationError,
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    }
  );
};

const handleResize = () => {
  if (mapInstance) {
    mapInstance.invalidateSize();
  }
};

onMounted(() => {
  getLocation();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="geo-container">
    <!-- Estado de carga -->
    <div v-if="state.loading" class="loading-spinner">
      <div class="spinner"></div>
      <span>Obteniendo ubicación...</span>
    </div>

    <!-- Mensaje de error -->
    <div v-if="state.error" class="error-message">
      {{ state.error }}
      <button @click="getLocation" class="retry-button">Reintentar</button>
    </div>

    <!-- Contenedor del mapa -->
    <div v-if="state.coords && !state.loading" class="map-container">
      <div id="miniMap" class="mini-map"></div>
    </div>
  </div>
</template>

<style scoped>
.geo-container {
  width: 100%;
  height: 100%;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.retry-button {
  background: none;
  border: none;
  color: #d32f2f;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 0.5rem;
}

.map-container {
  width: 100%;
  height: 300px;
  position: relative;
}

.mini-map {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.map-footer {
  padding: 0.5rem;
  text-align: center;
  background-color: white;
  font-size: 0.875rem;
  color: #666;
}
</style>