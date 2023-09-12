import React from 'react'

// import components
import Hero from '../components/hero/Hero'
import PopularDishes from '../components/categories/PopularDishes'
import RecentPost from '../components/Recent-post/RecentPost'

function Home() {
  return (
    <>
      <Hero />
      {/* <PopularDishes/> */}
      <RecentPost />
    </>
  )
}

export default Home