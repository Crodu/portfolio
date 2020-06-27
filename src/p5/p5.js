import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from './loadable';
import Sketch from './sketch';

function P5(){

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  React.useEffect(() => {
    function handleResize() {
      console.log(window.innerHeight, window.innerWidth)
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return(
  <P5Wrapper sketch={Sketch} size={dimensions} />
  )
}

export default P5