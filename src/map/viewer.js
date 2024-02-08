import * as Cesium from 'cesium';


export const options = {
    defaultAccessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODkyZTY2MC0yZmI0LTRlNGUtYjg1Yi05NWU4MDlkMWJlZWQiLCJpZCI6MTkxMzYwLCJpYXQiOjE3MDU5ODk5MTh9.KLfLEVslyiCbcykvVuN_EhwTk2UtLRFTIUD2MJNMclU',
    cesiumContainer: 'cesiumContainer',
};

export let viewer = {};


/**
 * viewer 생성(3D 지도)
 * @param {Object} _options 
 * @param {String} _options.defaultAccessToken 
 * @param {String} _options.cesiumContainer 
 * @returns 
 */
export const create = async (_options) => {
    Object.assign(options, _options);
    Cesium.Ion.defaultAccessToken = options.defaultAccessToken;

    viewer = new Cesium.Viewer(options.cesiumContainer, {
        terrain: Cesium.Terrain.fromWorldTerrain(),
    });

    return viewer;
};


/**
 * 카메라 이동
 * @param {*} position 
 */
export const flyTo = (position) =>{
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
 * @param {Number} assetId 
 */
export const fromIonAssetId = async(assetId) =>{
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(assetId);
    tileset.maximumScreenSpaceError = 10; // 높을 수록 성능 up, 해상도 down
    viewer.scene.primitives.add(tileset);
}