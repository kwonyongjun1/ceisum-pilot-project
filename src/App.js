import { Cartesian3 } from "cesium";
import { Viewer, Entity } from "resium";
import * as Cesium from "cesium"

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };


function App() {
  return (
    <div className="App">
      <Viewer full>
        <Entity position={position} point={pointGraphics} />
      </Viewer>
    </div>
  );
}

export default App;
