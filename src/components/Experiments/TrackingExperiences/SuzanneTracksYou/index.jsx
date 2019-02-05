import * as faceapi from 'face-api.js';
import { useFaceApiDetection } from 'hooks/faceapi.js';
import React from 'react';
import { StyledEmotionalFace, StyledScene, Canvas } from './styles';

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
  interval: 200,
}

const Index = ({ mediaInput }) => {
  if (mediaInput && mediaInput.video) mediaInput = mediaInput.video
  const { bboxCenter, bestFaceExpression } = useFaceApiDetection({
    input: mediaInput,
    canvas: displayCanvas,
    ...faceApiConfig
  })
  useFaceApiOverlay(results, boxDetectionsCanvasRef);
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
