import * as Cesium from "cesium";
import { useEffect } from "react";
import { create, fromIonAssetId, flyTo } from "../map/viewer"
import { createEventHandler } from "../map/handler";

function CesiumMap(){

    const init = async() => {
        create()
            .then(createEventHandler)
            .then(fromIonAssetId(96188))
            .then(flyTo(position_GM))
    }

    useEffect(()=>{
        init();
    },[]);

    return(
        <div id ="cesiumContainer" style={{width: '80%', height: '80%', margin: 0, padding: 0}}>
        </div>
    )
}

export default CesiumMap;