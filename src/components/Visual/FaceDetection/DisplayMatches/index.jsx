import * as faceapi from 'face-api.js';
import { BoxWithText } from 'face-api.js';
import React from 'react';
import { DisplayResults } from 'external/face-api.js-react';


export const DisplayMatches = ({ children, ...props }) => {

  const { input, fullFaceDescriptions, overlay, withScore, getBestMatch } = props

  const boxesWithText = faceapi.resizeResults(fullFaceDescriptions, overlay)
    .map(fd => {
      const bestMatch = getBestMatch(fd.descriptor)
      const text = `${bestMatch.distance < 0.6 ? bestMatch.label : 'unknown'} (${faceapi.round(bestMatch.distance)})`
      return new BoxWithText(fd.detection.box, text)
    })

  return (
    <DisplayResults
      input={input}
      results={boxesWithText}
      overlay={overlay}
      displayResultsOptions={{ withScore }}
    >
      { children }
    </DisplayResults>
  )
}
