import React from "react";
import * as Cesium from "cesium";
import { remove, set } from "../map/handler";
import { flyTo, viewer } from "../map/viewer";
import { add as addEntities, removeAll as removeAllEntities} from "../map/entities"

function MapController() {
    const position_GM = Cesium.Cartesian3.fromDegrees( 126.864444,  37.477778, 500); // korea position  

    const setAddRedBoxEvent = () =>{
        set(addRedBox, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        set(removeLeftClickEvent, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    const removeLeftClickEvent = () =>{
        remove(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    const clearAllAsset = () =>{
        removeAllEntities();
    }

    const addRedBox = (click) =>{
        const ray = viewer.camera.getPickRay(click.position);
        const position = viewer.scene.globe.pick(ray, viewer.scene);
        
        if (Cesium.defined(position)) {
            addEntities({
                position: position,
                box: {
                    dimensions: new Cesium.Cartesian3(10, 10, 10),
                    material: Cesium.Color.RED
                }
            });
        }
    }

    const setAddBuildingEvent = () =>{
        set(addBuilding, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        set(removeLeftClickEvent, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    }
    const addBuilding = async (click) =>{
        // 클릭 지점의 레이를 가져옵니다.
        const ray = viewer.camera.getPickRay(click.position);

        // 레이를 사용하여 지형 표면의 위치를 가져옵니다.
        const position = viewer.scene.globe.pick(ray, viewer.scene);

        if(Cesium.defined(position)){
            const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2451439);
            console.log(position);
            debugger;
            tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            viewer.scene.primitives.add(tileset);

            tileset.allTilesLoaded.addEventListener(()=>{
                console.log("건물 생성");
            });
        }
    }

    return(
        <div>
            <div>
                <label> Move </label>
                <button onClick={()=>{flyTo(position_GM)}}>광명 이동</button>
            </div>
            <div>
                <label> Asset </label>
                <button onClick={setAddRedBoxEvent}>box 추가(오른쪽 마우스 OFF)</button>
                <button onClick={setAddBuildingEvent}>빌딩 추가(오른쪽 마우스 OFF)</button>
                <button onClick={clearAllAsset}>AssetClear</button>
            </div>
        </div>
    )
}


export default MapController

