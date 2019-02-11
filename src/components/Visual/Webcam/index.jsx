import React, { useEffect, useRef, useState } from 'react';
import { useSetState } from 'react-use';
import Webcam from 'react-webcam';

export function useWebcam(...props) {
  const ref = useRef();
  const [state, setState] = useSetState({
    buffered: [],
    time: 0,
    duration: 0,
    isPlaying: false,
    muted: false,
    volume: 1,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const onPlay = () => setState({ isPlaying: true }) && setIsPlaying(true);
  const onPause = () => setState({ isPlaying: false }) && setIsPlaying(false);
  const webcam = <Webcam
    ref={ref}
    onUserMedia={() => setIsPlaying(true)}
    onUserMediaError={() => setIsPlaying(false)}
    width={props.width ? props.width : "100%"}
    height={props.height ? props.height : "100%"}
  />
  useEffect(() => {
    if (ref.current && ref.current.video && isPlaying) {
      ref.current.video.oncanplay = onPlay;
      if (ref.current.video.readyState > 3) onPlay();
    } else {
      onPause();
    }
  }, [ref.current, isPlaying])
  return [webcam, state, null, ref];
}
