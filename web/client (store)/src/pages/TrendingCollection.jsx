import React from 'react'
import Meta from '../components/Meta'
import GameCard from '../components/GameCard'

const TrendingCollection = () => {
  return (
    <>
      <Meta title="Game Yang Sedang Tren" />
      <div className="trending-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>Sedang Tren</h1>
            </div>
            <GameCard collection="trending" />
            <GameCard collection="trending" />
            <GameCard collection="trending" />
            <GameCard collection="trending" />
            <GameCard collection="trending" />
            <GameCard collection="trending" />
            <GameCard collection="trending" />
            <GameCard collection="trending" />
          </div>
        </div>
      </div>
    </>
  )
}

export default TrendingCollection