import React, { useState, useContext } from 'react'
import { FaCog, FaVolumeUp, FaVolumeMute, FaVideo, FaVideoSlash } from 'react-icons/fa'

import { toggleVideo, toggleAudio, localMediaStream } from '../webRTC'
import { Video } from './MediaChatView'
import { DispatchContext } from '../App'
import { ShowModalAction } from '../Actions'
import { Modal } from '../modals'

interface Props {
  speaking: boolean
  hideUI?: boolean
}

export default function LocalMediaView (props: Props) {
  const dispatch = useContext(DispatchContext)
  const [sendVideo, setUseVideo] = useState(true)
  const [sendAudio, setUseAudio] = useState(true)

  const onChangeVideo = (e) => {
    toggleVideo(sendVideo)
    setUseVideo(!sendVideo)
  }

  const onChangeAudio = (e) => {
    toggleAudio(sendAudio)
    setUseAudio(!sendAudio)
  }

  const showMediaSelector = () => {
    dispatch(ShowModalAction(Modal.MediaSelector))
  }

  return (
    <div className="my-video">
      You:
      <Video
        srcObject={localMediaStream()}
        className={`self ${props.speaking ? 'speaking' : ''}`}
        muted={true}
      />
      {props.hideUI ? '' : (
        <div>
          <button id='send-video' onClick={onChangeVideo} className={`link-styled-button video-button ${sendVideo ? 'enabled' : 'disabled'}`} aria-label='Toggle Video'>
            {sendVideo ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button id='send-audio' onClick={onChangeAudio} className={`link-styled-button video-button ${sendAudio ? 'enabled' : 'disabled'}`} aria-label='Toggle Audio'>
            {sendAudio ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button id='show-media-selector' onClick={showMediaSelector} className='link-styled-button video-button' aria-label='Show Media Selector'>
            <FaCog />
          </button>
        </div>
      )}

    </div>
  )
}
