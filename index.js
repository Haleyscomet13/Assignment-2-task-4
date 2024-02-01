require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction"
], (Map, MapView, ImageryLayer, RasterFunction) => {
  const imagePopupTemplate = {
    title: "Data from Landsat 8 satellite",
    content: `
      Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
      <br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
    `
  };

  const landsatRFT = new RasterFunction({
    functionName: "NDVI",
    variableName: "Raster"
    // Add any other parameters specific to the NDVI Raster Function here if needed
  });

  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: landsatRFT,
    popupTemplate: imagePopupTemplate
  });

  const map = new Map({
    basemap: "hybrid",
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: {
      x: -95.7129, // Longitude for the Midwest
      y: 37.0902,  // Latitude for the Midwest
      spatialReference: 4326
    },
    zoom: 5, // Adjust the zoom level as needed
    popup: {
      actions: []
    }
  });
});
