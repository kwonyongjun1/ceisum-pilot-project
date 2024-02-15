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
        let cartesian = viewer.scene.pickPosition(click.position);

        if(Cesium.defined(cartesian)){
            await Cesium.Cesium3DTileset.fromIonAssetId(2451439)
                .then((tileset)=>{
                    
                    tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian);
                    viewer.scene.primitives.add(tileset);
                    
                })
            // tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        
            // viewer.scene.primitives.add(tileset);

            // tileset.allTilesLoaded.addEventListener(()=>{

            //     console.log("건물 생성");
            //     alert("생성됨");
            // });
        }
    }

    
    /**
     * entity 정보 가져오기 수정중
     * @param {*} movement 
     */
    const getEntityInfo = (movement) =>{
        let pickedObject = viewer.scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
            // 픽킹된 객체가 모델인 경우 정보 출력
            console.log(entity.description);
            entity.label.show = true;
            entity.label.text = entity.description;
        }else{
            entity.label.show = false;
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

