import React from 'react'
import { useLocation } from 'react-router-dom'

function AboutUs() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <h1>about</h1>
    </div>
  )
}

export default AboutUs

