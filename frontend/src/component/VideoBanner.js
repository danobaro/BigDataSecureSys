import React from 'react'
import bgVideo from '../img/bgVideo.mp4'

function Videobanner() {
  return (
    <div className='flex'>
        <div className="text-center">
                <video src={bgVideo}
                    autoplay="{true}" loop muted 
                    className="h-full w-64 object-cover "> 
                </video>
            </div>
    </div>
  )
}

export default Videobanner