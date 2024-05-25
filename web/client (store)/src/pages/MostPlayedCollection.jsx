import React from 'react'
import Meta from '../components/Meta'
import GameCard from '../components/GameCard'

const MostPlayedCollection = () => {
  return (
    <>
      <Meta title="Game Paling Banyak Dimainkan" />
      <div className="most-played-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>Paling Banyak Dimainkan</h1>
            </div>
            <GameCard collection="most-played" />
            <GameCard collection="most-played" />
            <GameCard collection="most-played" />
            <GameCard collection="most-played" />
            <GameCard collection="most-played" />
            <GameCard collection="most-played" />
            <GameCard collection="most-played" />
            <GameCard collection="most-played" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MostPlayedCollection