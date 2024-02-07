import React from "react";
import * as Cesium from "cesium";
import { addAssetOnMap, remove, set } from "../map/handler";


function MapController() {
    const position_GM = Cesium.Cartesian3.fromDegrees( 126.864444,  37.477778, 500); // korea position  

    const onAddAsset = () =>{
        set(addAssetOnMap, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    const offAddAsset = () =>{
        remove(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    return(
        <div>
            <button onClick={()=>{flyTo(position_GM)}}>광명 이동</button>
            <button onClick={onAddAsset}>box 추가 on</button>
            <button onClick={offAddAsset}>box 추가 off</button>
        </div>
    )
}


export default MapController

