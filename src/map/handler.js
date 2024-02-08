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

