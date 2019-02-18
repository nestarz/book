import { useEffect, useState, useRef } from "react";
import Meyda from "meyda";
import { isEqual } from 'lodash';

export const useMeydaAnalyzer = (config) => {
  const [analyzer, setAnalyzer] = useState();
  const [audioContext, setAudioContext] = useState();
  const [source, setSource] = useState();
  const [features, setFeatures] = useState();
  const featuresRef = useRef(features);
  useEffect(() => {
    if (source && audioContext && !analyzer) {
      const new_analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: config.bufferSize || 512,
        featureExtractors: config.featureExtractors || ['rms'],
        callback: (nextFeatures) => {
          const currFeatures = featuresRef.current;
          if (!isEqual(currFeatures, nextFeatures)) {
            console.log(currFeatures, nextFeatures)
            setFeatures(nextFeatures);
          }
        }
      });
      setAnalyzer(new_analyzer);
    } else if (analyzer) {
      analyzer.setSource(source)
    }
  }, [source])
  useEffect(() => {
    if(analyzer) analyzer.start();
  }, [analyzer])
  useEffect(() => {
    featuresRef.current = features;
  }, [features])
  return {
    analyzer,
    features,
    setAudioContext,
    setSource
  }
};
