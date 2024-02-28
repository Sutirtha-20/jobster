import React from 'react'

function Loading(props) {
    const {position} = props
  return (
    <div className={position ? 'loading loading-center' : 'loading'}></div>
  )
}

export default Loading