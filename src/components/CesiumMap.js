// import { Cartesian3 } from "cesium";
import * as Cesium from "cesium";
import { useEffect } from "react";


function CesiumMap(){
    const ionAssetID = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODkyZTY2MC0yZmI0LTRlNGUtYjg1Yi05NWU4MDlkMWJlZWQiLCJpZCI6MTkxMzYwLCJpYXQiOjE3MDU5ODk5MTh9.KLfLEVslyiCbcykvVuN_EhwTk2UtLRFTIUD2MJNMclU';
    const position_kr = Cesium.Cartesian3.fromDegrees( 126.864444,  37.477778, 1000); // korea position 
    
    useEffect(()=>{
        const initCeisum = async() => {
            Cesium.Ion.defaultAccessToken = ionAssetID;

            const viewer = new Cesium.Viewer('cesiumContainer', {
                terrain: Cesium.Terrain.fromWorldTerrain({
                    requestVertexNormals: true, //지형 조명
                    requestWaterMask: true, // 물 효과
                }),
            });
            
            const tileset = viewer.scene.primitives.add(
                await Cesium.Cesium3DTileset.fromIonAssetId(96188)
            );

            // Camera 이동
            viewer.camera.flyTo({
                destination: position_kr,
                orientation: {
                    heading: Cesium.Math.toRadians(0), // 선택적으로 회전 각도 지정 가능
                    pitch: Cesium.Math.toRadians(-45), // 선택적으로 기울임 각도 지정 가능
                    roll: 0, // 선택적으로 롤 각도 지정 가능
                },
            });

            return () => {
                viewer.destroy();
            };
        }
        
        initCeisum();
    },[]);

    return(
        <div id ="cesiumContainer" style={{ width: '100%', height: '100vh' }}>

        </div>
    )
}

export default CesiumMap;