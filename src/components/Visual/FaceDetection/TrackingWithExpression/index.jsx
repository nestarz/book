import * as faceapi from 'face-api.js';
import React from 'react';
import { TrackFaces } from '../TrackFaces';


export const TrackFacesWithExpressions = ({ withBoxes, input, detectionOptions, ...props }) => (
  <TrackFaces
    {...props}
    displayOptions={{ withBoxes, withScore: false }}
    runTask={async () => faceapi.detectAllFaces(input.element, detectionOptions).withFaceExpressions()}
  />
)
