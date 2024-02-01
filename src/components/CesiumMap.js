// import { Cartesian3 } from "cesium";
import * as Cesium from "cesium";
import { useEffect, useRef, useState } from "react";


function CesiumMap(){
    const ionAssetID = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODkyZTY2MC0yZmI0LTRlNGUtYjg1Yi05NWU4MDlkMWJlZWQiLCJpZCI6MTkxMzYwLCJpYXQiOjE3MDU5ODk5MTh9.KLfLEVslyiCbcykvVuN_EhwTk2UtLRFTIUD2MJNMclU';
    const position_GM = Cesium.Cartesian3.fromDegrees( 126.864444,  37.477778, 500); // korea position 
    const cesiumContainer = useRef();
    const [viewer, setViewer] = useState();

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
     * 
     * @param {Cesium.Viewer} viewer 
     */
    const flyToGM = (viewer) =>{
        viewer.camera.flyTo({
            destination: position_GM,
            orientation: {
                heading: Cesium.Math.toRadians(0), // 선택적으로 회전 각도 지정 가능
                pitch: Cesium.Math.toRadians(-45), // 선택적으로 기울임 각도 지정 가능
                roll: 0, // 선택적으로 롤 각도 지정 가능
            },
        });
    }

    useEffect(()=>{
        const initCeisum = async() => {
            Cesium.Ion.defaultAccessToken = ionAssetID;

            let newViewer = new Cesium.Viewer('cesiumContainer', {
                terrain: Cesium.Terrain.fromWorldTerrain({
                    requestVertexNormals: true, //지형 조명
                    requestWaterMask: true, // 물 효과
                    fullscreenButton: false, // 풀 스크린 버튼
                    homeButton: false, //홈 버튼
                    sceneModePicker: false, //지도 모드 버튼
                    timeline: false, //시간라인
                    navigationHelpButton: false, //도움말 버튼
                    animation: false, //재생 등등 버튼
                    baseLayerPicker: false, //레이어 선택 버튼
                    geocoder: false, //주소검색 버튼
                }),
            })
            
            // Ion 자산 가져온 후 지도에 반영
            const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
            tileset.maximumScreenSpaceError = 10; // 높을 수록 성능 up, 해상도 down
            newViewer.scene.primitives.add(tileset);

            flyToGM(newViewer);
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
            <button onClick={()=>{flyToGM(viewer)}}>광명 이동</button>
            <div id ="cesiumContainer" ref= {cesiumContainer} style={{width: '80%', height: '80%', margin: 0, padding: 0}}>
            </div>
        </div>
        
    )
}

export default CesiumMap;