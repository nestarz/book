import * as faceapi from 'face-api.js';
import { withAsyncRendering } from 'external/face-api.js-react';

async function initRefDescriptors(props) {
  const refDescriptors = await Promise.all(
    props.refDataSources.map(async ({ label, url }) => {
      const img = await faceapi.bufferToImage(await (await fetch(url)).blob())
      const descriptor = await faceapi.nets.faceRecognitionNet.computeFaceDescriptor(img)
      return {
        label: label.replace('1.png', ''),
        descriptor
      }
    })
  )

  const getBestMatch = (queryDescriptor) =>
    refDescriptors.map(ref => ({
      label: ref.label,
      distance: faceapi.euclideanDistance(ref.descriptor, queryDescriptor)
    }))
      .reduce((best, curr) => curr.distance < best.distance ? curr : best)

  return {
    refDescriptors,
    getBestMatch
  }
}

export const ComputeRefDescriptors = withAsyncRendering(initRefDescriptors)
