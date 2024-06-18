import React from 'react'

const Loading = () => {
  return (
    <>
      <div className="overlay">
        <div className="overlay__inner">
          <div className="overlay__content">
            <div className="spinner">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading