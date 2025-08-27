import './App.css'
import { useParams } from './context/context'
import Navbar from './components/navbar/navbar'
import Grid from './components/grid/grid'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Grid />
    </div>
  )
}

export default App