// import { Cartesian3 } from "cesium";
import * as Cesium from "cesium";
import { useEffect, useRef, useState } from "react";


function CesiumMap(){
    const ionAssetID = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODkyZTY2MC0yZmI0LTRlNGUtYjg1Yi05NWU4MDlkMWJlZWQiLCJpZCI6MTkxMzYwLCJpYXQiOjE3MDU5ODk5MTh9.KLfLEVslyiCbcykvVuN_EhwTk2UtLRFTIUD2MJNMclU';
    const position_GM = Cesium.Cartesian3.fromDegrees( 126.864444,  37.477778, 500); // korea position 
    const cesiumContainer = useRef();
    const [viewer, setViewer] = useState();
    const [clickPosition, setClickPosition] = useState({});
    const [addAssetOnMapHandler, setAddAssetOnMapHandler] = useState();

    const isMapExist = () =>{ 
        const cesiumContainerElement = cesiumContainer.current;
        if(cesiumContainerElement){
            const cesiumViewerElement = cesiumContainerElement.querySelector('.cesium-viewer');
            if(cesiumViewerElement){
                return true;
            }
        }
        return false;
    }
    
    /**
     * 카메라 이동 
     * @param {Cesium.Viewer} viewer 
     */
    const flyTo = (viewer, position) =>{
        viewer.camera.flyTo({
            destination: position,
            orientation: {
                heading: Cesium.Math.toRadians(0), // 선택적으로 회전 각도 지정 가능
                pitch: Cesium.Math.toRadians(-45), // 선택적으로 기울임 각도 지정 가능
                roll: 0, // 선택적으로 롤 각도 지정 가능
            },
        });
    }


    /**
     * box 추가 기능 on/off
     */
    const addAssetOnMapOnOff = () =>{
        if(!!addAssetOnMapHandler){
            addAssetOnMapHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            setAddAssetOnMapHandler(null);
        }else{
            const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction((movement) => {
                const ray = viewer.camera.getPickRay(movement.position);
                const position = viewer.scene.globe.pick(ray, viewer.scene);
                setClickPosition(position);
                
                if (Cesium.defined(position)) {
                // 클릭한 위치에 자산 추가
                //   const asset = viewer.scene.primitives.add(
                //     new Cesium.Cesium3DTileset({
                //       url: Cesium.IonResource.fromAssetId(2432421),
                //       maximumScreenSpaceError: 16,
                //       position : position
                //     })
                //   );
                //   asset.position = position;

                    viewer.entities.add({
                        position: position,
                        box: {
                            dimensions: new Cesium.Cartesian3(10, 10, 10),
                            material: Cesium.Color.RED
                        }
                    });
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            setAddAssetOnMapHandler(handler);
        }
    }

    useEffect(()=>{
        const initCeisum = async() => {
            Cesium.Ion.defaultAccessToken = ionAssetID;

            // viewer 생성(3D 지도)
            let newViewer = new Cesium.Viewer('cesiumContainer', {
                terrain: Cesium.Terrain.fromWorldTerrain({
                    requestVertexNormals: true, //지형 조명
                    requestWaterMask: true, // 물 효과
                }),
            })
            
            // Ion 자산에 있는 3D 건물 가져온 후 지도에 반영
            const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
            tileset.maximumScreenSpaceError = 10; // 높을 수록 성능 up, 해상도 down
            newViewer.scene.primitives.add(tileset);

            // 카메라 이동
            flyTo(newViewer, position_GM);

            // viewer 상태값으로 저장
            setViewer(newViewer);

            return () => {
                newViewer.destroy();
            };
            
        }

        if(!isMapExist()){
            initCeisum();
        }

    },[]);

    return(
        <div>
            <div>
                <label>클릭 지점 x : {clickPosition?.x} y : {clickPosition?.y} z : {clickPosition?.z}</label>
            </div>
            <button onClick={()=>{flyTo(viewer, position_GM)}}>광명 이동</button>
            <button onClick={addAssetOnMapOnOff}>건물 추가 on/off</button>

            <div id ="cesiumContainer" ref= {cesiumContainer} style={{width: '80%', height: '80%', margin: 0, padding: 0}}>
            </div>
        </div>
        
    )
}

export default CesiumMap;