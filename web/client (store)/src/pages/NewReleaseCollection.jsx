import React from 'react'
import Meta from '../components/Meta'
import GameCard from '../components/GameCard'

const NewReleaseCollection = () => {
  return (
    <>
      <Meta title="Game Keluaran Terbaru" />
      <div className="new-release-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>Keluaran Terbaru</h1>
            </div>
            <GameCard collection="new-release" />
            <GameCard collection="new-release" />
            <GameCard collection="new-release" />
            <GameCard collection="new-release" />
            <GameCard collection="new-release" />
            <GameCard collection="new-release" />
            <GameCard collection="new-release" />
            <GameCard collection="new-release" />
          </div>
        </div>
      </div>
    </>
  )
}

export default NewReleaseCollection