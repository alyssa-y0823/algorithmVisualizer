import './App.css'
import { useParams } from './contexts/context'
import Navbar from './components/Navbar/Navbar'
import Grid from './components/Grid/Grid'

function App() {
  console.log(useParams())

  return (
    <div className="App">
      <Navbar />
      <Grid />
    </div>
  )
}

export default App