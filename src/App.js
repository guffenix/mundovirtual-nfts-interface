import { Route } from 'react-router-dom'
import Home from './views/home'
import MainLayout from './layouts/main'

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
    </MainLayout>
  )
}

export default App
