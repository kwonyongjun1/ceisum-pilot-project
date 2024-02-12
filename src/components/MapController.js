import React from "react";
import * as Cesium from "cesium";
import { remove, set } from "../map/handler";
import { flyTo, viewer } from "../map/viewer";
import { add as addEntities, removeAll as removeAllEntities} from "../map/entities"

function MapController() {
    const position_GM = Cesium.Cartesian3.fromDegrees( 126.864444,  37.477778, 500); // korea position  

    /**
     * 클릭 이벤트 설정
     * 우클릭 시 액션 취소 
     * @param {*} action 
     */
    const setClickEvent = (action) => {
        set(action, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        set(()=> remove(Cesium.ScreenSpaceEventType.LEFT_CLICK), Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    
    const setAddRedBoxEvent = () =>{
        setClickEvent(addRedBox);
    }

    const setAddBuildingEvent = () =>{
        setClickEvent(addBuilding);
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

    const addBuilding = async (click) =>{
        // 클릭 지점의 레이를 가져옵니다.
        const ray = viewer.camera.getPickRay(click.position);

        // 레이를 사용하여 지형 표면의 위치를 가져옵니다.
        const position = viewer.scene.globe.pick(ray, viewer.scene);

        if(Cesium.defined(position)){
            const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2451439);
            tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            viewer.scene.primitives.add(tileset);

            tileset.allTilesLoaded.addEventListener(()=>{
                console.log("건물 생성");
            });
        }
    }

    const setDisplayLonLatOnMouse = () =>{

    }

    const displayLonLat = (event) =>{
        let earthPosition = viewer.scene.pickPosition(event.position);

        if(Cesium.defined(earthPosition)){
        }
    }

    return(
        <div>
            <div>
                <label> Move </label>
                <button onClick={()=>{flyTo(position_GM)}}>광명 이동</button>
                <button >위,경도 표출</button>
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

