<template>
  <div>
    <div ref="mapContainer" style="width: 100%; height: 80vh;"></div>
    <button @click="cargarGeoJSON" style="margin-top: 10px; padding: 8px 16px; background: #3182ce; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Cargar GeoJSON
    </button>
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
import miGeoJSON from '@/assets/data/colonias-cdmx-.json'

// Coordenadas del centro de CDMX (Zócalo)
const centroCDMX = fromLonLat([-99.1332, 19.4326])

const mapContainer = ref(null)
let mapa = ref(null)
let capaVectorial = ref(null)

onMounted(() => {
  // Crear mapa básico
  mapa.value = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({ source: new OSM() })  // Capa base OSM
    ],
    view: new View({
      center: centroCDMX,
      zoom: 13
    })
  })
})

const cargarGeoJSON = () => {
  // Eliminar capa anterior si existe
  if (capaVectorial.value) {
    mapa.value.removeLayer(capaVectorial.value)
  }

  // Crear capa vectorial desde GeoJSON
  const fuente = new VectorSource({
    features: new GeoJSON().readFeatures(miGeoJSON, {
      featureProjection: 'EPSG:3857'  // Sistema de coordenadas del mapa
    })
  })

  capaVectorial.value = new VectorLayer({
    source: fuente,
    style: new Style({
      fill: new Fill({ color: 'rgba(0, 100, 255, 0.2)' }),
      stroke: new Stroke({ color: 'rgba(0, 100, 255, 0.8)', width: 2 })
    })
  })

  // Añadir al mapa y ajustar vista
  mapa.value.addLayer(capaVectorial.value)
  mapa.value.getView().fit(fuente.getExtent(), { padding: [50, 50, 50, 50] })
}
</script>