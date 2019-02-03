import { findBestExpression, useFaceApiDetection } from 'hooks/face-api.js';
import React from 'react';
import { StyledEmotionalFace, StyledScene } from './styles';

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
}

const Index = ({ mediaInput }) => {
  const { bboxResults, expressionsResults } = useFaceApiDetection({input: mediaInput, ...faceApiConfig})
  const [ bestExpressionName, bestExpressionScore ] = findBestExpression(expressionsResults);

  let lookAt;
  if(bboxResults.length == 1) {
    lookAt = getNormalizedBoxCenter(bboxResults[0])
  }
  else if(bboxResults.length > 1) {
    throw "Received more than one result. This example dont need them."
  }
  else {
    lookAt = {x: 0, y: 0, z: 0}
  }
  return <>
      <StyledScene lookAt={lookAt} />
      <StyledEmotionalFace
        expressionName={bestExpressionName}
        expressionScore={bestExpressionScore}
      />
  </>
};

export default Index;

Index.propTypes = {};
