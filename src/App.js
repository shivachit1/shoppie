import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import axios from "axios"
import Gloves from './components/Gloves'
import Navbar from './components/Navbar'
import FaceMasks from './components/FaceMasks'
import Beanies from './components/Beanies'

function App() {
  
  const [gloves, setGloves] = useState([])
  const [faceMasks, setFaceMasks] = useState([])
  const [beanies, setBeanies] = useState([])
  const [manufacturers,setManuFacturers] = useState([])

  useEffect(() => {

    const getData = async () =>{
      // getting all gloves data from endpoint and saving to state
      const glovesData = await axios.get("v2/products/gloves")
      setGloves(glovesData.data)
      
      // getting all facemasks data from endpoint and saving to state
      const faceMasksData = await axios.get("v2/products/facemasks")
      setFaceMasks(faceMasksData.data)

      // getting all beanies data from endpoint and saving to state
      const beaniesData = await axios.get("v2/products/beanies")
      setBeanies(beaniesData.data)
      
      // getting distinct manufacturer names from Beanies data
      const manus = [...new Set(beaniesData.data.map(data => data.manufacturer))]

      // calling manufacturer api end points using array loop and promises
      Promise.all(manus.map(manu => getAvailability(manu)))
      .then(results => {
        // saving all results to its app state
          setManuFacturers(results)
      })
      .catch(err => {
        // error handling 
          console.log(err)
      })
      
  }


    const getAvailability = async (manufacturName) => {
      // calling api end point to get all products of manufacturer 
        let res = await axios.get(`v2/availability/${manufacturName}`)

        // if the response is "[]" calling until the data is recieved
        while(res.data.response === "[]"){
          res = await axios.get(`v2/availability/${manufacturName}`)
        }
        return {name:manufacturName,values:res.data.response}
    }
    

    getData()
    
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar/>
        
        <div>
          <Redirect exact from="/" to="/gloves" />
          <Route path="/gloves" render={()=><Gloves gloves={gloves} manufacturers={manufacturers}/>}/>
          <Route path="/facemasks" render={()=><FaceMasks faceMasks={faceMasks} manufacturers={manufacturers}/>}/>
          <Route path="/beanies" render={()=><Beanies beanies={beanies} manufacturers={manufacturers}/>}/>
        </div>
        
      </Router>
      
    </div>
  )
}

export default App
