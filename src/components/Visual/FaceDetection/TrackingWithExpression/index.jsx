import * as faceapi from 'face-api.js';
import React from 'react';
import { TrackFaces } from '../TrackFaces';


export const TrackFacesWithExpressions = ({ withBoxes }) => (
  <TrackFaces
    {...this.props}
    displayOptions={{ withBoxes, withScore: false }}
    runTask={async () => faceapi.detectAllFaces(this.props.input.element, this.props.detectionOptions).withFaceExpressions()}
  />
)
