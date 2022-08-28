import React from 'react'
import { Route } from 'react-router-dom'
import MainLayout from './layouts/main'

import Home from './views/home'
import Gallery from './views/gallery'
import Card from './views/card'
import About from './views/about'

function App() {
  return (
    <MainLayout>
      <Route path="/" exact component={Home} />
      <Route path="/gallery" exact component={Gallery} />
      <Route path="/nfts" exact component={Gallery} />
      <Route path="/nft/:tokenId" exact component={Card} />
      <Route path="/about" exact component={About} />
    </MainLayout>
  )
}

export default App
