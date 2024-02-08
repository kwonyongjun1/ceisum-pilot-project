import * as Cesium from "cesium";
import { viewer } from "./viewer";

export const add = (attr) =>{
    viewer.entities.add(attr);
}

export const removeAll = () =>{
    viewer.entities.removeAll();
}