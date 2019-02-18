import { useEffect, useState } from "react";
import Meyda from "meyda";
import { isEqual } from 'lodash';
import { useGetSet } from 'react-use';

export const useMeyda = (audioNode) => {
  const [analyzer, setAnalyzer] = useState();
  const [getFeatures, setFeatures] = useGetSet();
  const features = getFeatures();
  useEffect(() => {
    if (audioNode && !analyzer) {
      const new_analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioNode.context.rawContext,
        source: audioNode,
        bufferSize: 512,
        featureExtractors: ["rms"],
        callback: (nextFeatures) => {
          const currFeatures = getFeatures();
          if (!isEqual(currFeatures, nextFeatures)) {
            console.log(currFeatures, nextFeatures)
            setFeatures(nextFeatures);
          }
        }
      });
      setAnalyzer(new_analyzer);
    } else if (analyzer) {
      analyzer.setSource(audioNode)
    }
  }, [audioNode])
  useEffect(() => {
    if(analyzer) analyzer.start();
  }, [analyzer])
  return [analyzer, features]
};
