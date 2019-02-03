import React from 'react';

const Index = ({ children, faceApiConfig }) => {
  const faceDetectionResults = useFaceApiDetection(faceApiConfig)
  const childrenWithFaceDetectionResults = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
        index,
        faceDetectionResults: faceDetectionResults
    });
  })

  return <>
    {childrenWithFaceDetectionResults}
  </>
};

export default Index;

Index.propTypes = {
  faceApiConfig: PropTypes.shape({
    input: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    detectAll: PropTypes.boolean.isRequired,
    withScore: PropTypes.boolean.isRequired,
    withExpressions: PropTypes.boolean.isRequired,
    withBoxes: PropTypes.boolean.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

