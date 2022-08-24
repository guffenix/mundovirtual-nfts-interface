import { Route } from 'react-router-dom'
import MainLayout from './layouts/main'

import Home from './views/home'
import Gallery from './views/gallery'
import Card from './views/card'

function App() {
  // simple way to handle login web3
  // useEffect(() => {
  //   if (window.ethereum) {
  //     const web3 = new Web3(window.ethereum)
  //     web3.eth.requestAccounts().then(console.log)
  //   }
  // }, [])

  return (
    <MainLayout>
      <Route path="/" exact component={Home} />
      <Route path="/gallery" exact component={Gallery} />
      <Route path="/gallery/:tokenId" exact component={Card} />
    </MainLayout>
  )
}

export default App
