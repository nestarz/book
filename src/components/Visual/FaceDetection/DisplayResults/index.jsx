import { useEffect } from 'react';
import { rawDisplayResults } from '../displayResults';


export const DisplayResults = () => {

  const displayResults = ({ input, overlay, results, displayResultsOptions }) => {
    rawDisplayResults(input, overlay, results, displayResultsOptions)
  }

  useEffect(() => displayResults(props), [props])

  const { children } = this.props
  return children ? children() : null
}
