import CesiumMap from "./components/CesiumMap";
import MapController from "./components/MapController";

function App() {
  return (
    <div className="App">
      <MapController/>
      <CesiumMap/>
    </div>
  );
}

export default App;
