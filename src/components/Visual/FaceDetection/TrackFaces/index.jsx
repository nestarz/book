import { useEffect, useState } from 'react';
import { displayResults } from 'external/face-api.js-react';


export const TrackFaces = ({ input, overlay, displayOptions, runTask }) => {
  const [isActive, setIsActive] = useState(false)
  run = async () => {
    if (!isActive) {
      return
    }

    if (!input) {
      return setTimeout(run, 0)
    }

    const results = await runTask()
    displayResults(input, overlay, results, displayOptions)

    setTimeout(this.run, 0)
  }

  useEffect(() => {
    setIsActive(true)
    run()
    return function cleanup() {
      setIsActive(false)
    }
  }, [])

    return null
}
