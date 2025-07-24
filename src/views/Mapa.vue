<template>
  <div class="w-full h-[80vh] relative">
    <div ref="mapContainer" class="w-full h-full"></div>
    <Boton 
      @click="cargarGeoJSON" 
      variante="primario" 
      tamano="mediano"
      class="mt-4 mx-auto"
    >
      Cargar GeoJSON
    </Boton>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM'
import GeoJSON from 'ol/format/GeoJSON'
import { fromLonLat } from 'ol/proj'
import { Fill, Stroke, Style } from 'ol/style'
import { defaults as defaultControls, Zoom, ScaleLine } from 'ol/control'
import 'ol/ol.css'
import Boton from '@/components/Boton.vue'
import miGeoJSON from '@/assets/data/colonias-cdmx-.json'

const centroCDMX = fromLonLat([-99.1332, 19.4326])
const mapContainer = ref(null)
let mapa = ref(null)
let capaVectorial = ref(null)

onMounted(() => {
  mapa.value = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({ 
        source: new OSM({
          attributions: [
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
          ]
        }) 
      })
    ],
    view: new View({
      center: centroCDMX,
      zoom: 13
    }),
    controls: defaultControls({
      zoom: false
    }).extend([
      new Zoom({
        className: 'ol-zoom custom-zoom-control',
        zoomInLabel: '+',
        zoomOutLabel: '-'
      }),
      new ScaleLine({
        className: 'custom-scale-line',
        minWidth: 100
      })
    ])
  })
})

const cargarGeoJSON = () => {
  if (capaVectorial.value) {
    mapa.value.removeLayer(capaVectorial.value)
  }

  const fuente = new VectorSource({
    features: new GeoJSON().readFeatures(miGeoJSON, {
      featureProjection: 'EPSG:3857'
    })
  })

  capaVectorial.value = new VectorLayer({
    source: fuente,
    style: new Style({
      fill: new Fill({ 
        color: 'rgba(157, 33, 72, 0.3)' // Usando color guinda-100 con transparencia
      }),
      stroke: new Stroke({ 
        color: 'rgba(157, 33, 72, 0.8)', 
        width: 2 
      })
    })
  })

  mapa.value.addLayer(capaVectorial.value)
  mapa.value.getView().fit(fuente.getExtent(), { 
    padding: [50, 50, 50, 50],
    duration: 1000
  })
}
</script>

<style>
/* Controles de zoom */
.custom-zoom-control {
  background-color: var(--color-blanco);
  box-shadow: var(--sombra);
  border-radius: var(--border-radio-4);
  overflow: hidden;
}

.custom-zoom-control button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gris-100);
  font-family: var(--font-contenido);
  transition: background-color 0.2s ease;
}

.custom-zoom-control button:hover {
  background-color: var(--color-gris-20);
}

.custom-zoom-control button:first-child {
  border-bottom: 1px solid var(--color-gris-40);
}

/* Escala gráfica */
.custom-scale-line {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 8px;
  border-radius: var(--border-radio-4);
  box-shadow: var(--sombra);
  font-family: var(--font-contenido);
  color: var(--color-gris-100);
  bottom: 8px;
  left: 8px;
}

/* Atribución */
.ol-attribution {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: var(--border-radio-4);
  font-size: 0.75rem;
  padding: 4px;
  font-family: var(--font-contenido);
  right: 8px;
  bottom: 8px;
}

.ol-attribution a {
  color: var(--color-guinda-100);
}

.ol-attribution a:hover {
  text-decoration: underline;
}

/* Transición para capas */
.ol-layer canvas {
  transition: opacity 0.3s ease;
}
</style>