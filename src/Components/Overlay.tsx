import React from 'react'

interface OverlayProps {
  ready: boolean
  clicked: boolean
  setClicked: (clicked: boolean) => void
}

const Overlay: React.FC<OverlayProps> = ({ ready, clicked, setClicked }) => {
  return (
    <>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div onClick={() => ready && setClicked(true)}>{!ready ? 'loading' : 'click to continue'}</div>
      </div>
    </>
  )
}

export default Overlay
