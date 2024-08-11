import React, { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const MapComponent = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "hybrid",
    });

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [35.2137, 31.7683],
      zoom: 7,
    });

    const capitalsLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
      outFields: ["CITY_NAME", "POP"],
      popupTemplate: {
        title: "{CITY_NAME}",
        content: [
          {
            type: "text",
            text: "אוכלוסיה: {POP}",
          },
        ],
      },
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker",
          color: "red",
          size: 8,
          outline: {
            width: 1,
            color: "black",
          },
        },
      },
    });

    map.add(capitalsLayer);

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return <div style={{ height: "100vh", width: "100%" }} ref={mapDiv}></div>;
};

export default MapComponent;
