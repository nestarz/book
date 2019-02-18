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
        featureExtractors: ["energy"],
        callback: (nextFeatures) => {
          const currFeatures = getFeatures();
          if (!isEqual(currFeatures, nextFeatures)) {
            console.log(isEqual(currFeatures, nextFeatures), currFeatures, nextFeatures)
            setFeatures(nextFeatures);
          }
        }
      });
      setAnalyzer(new_analyzer);
      console.log(audioNode)
    } else if (analyzer) {
      //console.log("here")
      //analyzer.start();
    }
  }, [audioNode])
  return [analyzer, features]
};
