import * as faceapi from 'face-api.js';
import { useFaceApiDetection, useFaceApiOverlay } from 'hooks/faceapi.js';
import React, { useRef } from 'react';
import { Canvas, StyledEmotionalFace, StyledScene } from './styles';

const faceApiConfig = {
  models: [
    {
      netLoader: faceapi.loadTinyFaceDetectorModel,
      path: '/assets/faceapi/models'
    },
    {
      netLoader: faceapi.loadFaceExpressionModel,
      path: '/assets/faceapi/models'
    },
  ],
  withBbox: true,
  withScore: true,
  withExpression: true,
  singleDetection: true,
  interval: 400,
}

const Index = ({ mediaInput }) => {
  const detectionCanvasRef = useRef();
  if (mediaInput && mediaInput.video) mediaInput = mediaInput.video
  const { results, bboxCenter, bestFaceExpression } = useFaceApiDetection({
    input: mediaInput,
    canvas: detectionCanvasRef,
    ...faceApiConfig
  })
  useFaceApiOverlay(results, detectionCanvasRef);
  return <>
    <StyledScene lookAt={bboxCenter} />
    <Canvas ref={detectionCanvasRef} />
    <StyledEmotionalFace
      className={"emotion-face"}
      expressionName={bestFaceExpression.name}
      expressionScore={bestFaceExpression.score}
    />
  </>
};

export default Index;

Index.propTypes = {};
