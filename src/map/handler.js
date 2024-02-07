import * as Cesium from 'cesium';
import { viewer } from './viewer';

let handler = {};

export const createEventHandler = () =>{
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
}

export const set = (action, type) =>{
    handler.setInputAction(action, type);
}

export const get = (type) =>{
    handler.getInputAction(type);
}

export const remove = (type) =>{
    handler.removeInputAction(type);
}


export const addAssetOnMap = (movement) =>{
    const ray = viewer.camera.getPickRay(movement.position);
    const position = viewer.scene.globe.pick(ray, viewer.scene);
    
    if (Cesium.defined(position)) {
    // 클릭한 위치에 자산 추가
        const asset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(2432421),
                maximumScreenSpaceError: 16,
                position: position
            })
        );
        asset.position = position;

        viewer.entities.add({
            position: position,
            box: {
                dimensions: new Cesium.Cartesian3(10, 10, 10),
                material: Cesium.Color.RED
            }
        });
    }
}
