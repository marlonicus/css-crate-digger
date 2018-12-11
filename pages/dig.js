import React, { useState, useContext } from "react";
import { pathOr } from "ramda";
import Loading from "../components/loading";
import Scene from "../components/scene";
import Crates from "../components/crates";
import Footer from "../components/footer";
import NowPlaying from "../components/now-playing";
import { Content, ContentContext } from "../components/content";
import { MousePosition } from "../components/mouse";
import { Camera, CameraContext } from "../components/camera";
import { getWindow } from "../utils";
import spotify from "../utils/spotify";

const getRecord = ({ crateIndex, recordIndex, content }) => {
  if (crateIndex === false || recordIndex === false || !content) {
    return {};
  }

  return content.data[crateIndex].content.tracks[recordIndex];
};

const onSetSelectedRecord = (hook, content, previousSelectedRecord) => (
  crateIndex,
  recordIndex
) => {
  if (
    crateIndex === previousSelectedRecord.crateIndex &&
    recordIndex === previousSelectedRecord.recordIndex
  )
    return;
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

  const nowPlaying = getRecord({ ...selectedRecord, content });

  return content.loaded ? (
    <>
      <NowPlaying
        artists={nowPlaying.artists}
        track={nowPlaying.name}
        href={pathOr(false, ["external_urls", "spotify"], nowPlaying)}
      />
      <Scene
        selectedRecord={selectedRecord}
        cameraPosition={asPercentageOfWindow(cameraPosition)}
      >
        <Crates
          crates={content.data}
          selectedRecord={selectedRecord}
          setSelectedRecord={onSetSelectedRecord(
            setSelectedRecord,
            content,
            selectedRecord
          )}
          saveSong={(crateIndex, recordIndex) => {
            const { uri } = getRecord({ crateIndex, recordIndex, content });
            spotify.saveToPlaylist({ uri });
          }}
        />
      </Scene>
    </>
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
