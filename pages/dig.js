import React, { useState, useContext } from "react";
import Loading from "../components/loading";
import Scene from "../components/scene";
import Crates from "../components/crates";
import Footer from "../components/footer";
import { Content, ContentContext } from "../components/content";
import { MousePosition } from "../components/mouse";
import { Camera, CameraContext } from "../components/camera";
import { getWindow } from "../utils";
import spotify from "../utils/spotify";

const getRecord = ({ crateIndex, recordIndex, content }) =>
  content.data[crateIndex].content.tracks[recordIndex];

const onSetSelectedRecord = (hook, content) => (crateIndex, recordIndex) => {
  if (recordIndex !== false) {
    hook({ crateIndex, recordIndex });
    const { uri } = getRecord({ crateIndex, recordIndex, content });
    spotify.play({ uri });
  } else {
    hook({ crateIndex: false, recordIndex: false });
    spotify.pause();
  }
};

const asPercentageOfWindow = ({ x, y }) => ({
  x: x / getWindow().innerWidth,
  y: y / getWindow().innerHeight
});

const App = () => {
  const cameraPosition = useContext(CameraContext);
  const content = useContext(ContentContext);

  const [selectedRecord, setSelectedRecord] = useState({
    crateIndex: false,
    recordIndex: false
  });

  return content.loaded ? (
    <Scene
      selectedRecord={selectedRecord}
      cameraPosition={asPercentageOfWindow(cameraPosition)}
    >
      <Crates
        crates={content.data}
        selectedRecord={selectedRecord}
        setSelectedRecord={onSetSelectedRecord(setSelectedRecord, content)}
        saveSong={(crateIndex, recordIndex) => {
          const { uri } = getRecord({ crateIndex, recordIndex, content });
          spotify.saveToPlaylist({ uri });
        }}
      />
    </Scene>
  ) : (
    <Loading />
  );
};

export default () => (
  <>
    <MousePosition>
      <Camera>
        <Content>
          <App />
        </Content>
      </Camera>
    </MousePosition>
    <Footer />
    <script src="https://sdk.scdn.co/spotify-player.js" />
  </>
);
