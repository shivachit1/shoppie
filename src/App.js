import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Gloves from './components/Gloves';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import FaceMasks from './components/FaceMasks';
import Beanies from './components/Beanies';
function App() {
  const [beanies, setBeanies] = useState([]);
  const [faceMasks, setFaceMasks] = useState([]);
  const [gloves, setGloves] = useState([]);
  const [manufacturers,setManuFacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getData = async () =>{
      const glovesData = await axios.get("v2/products/gloves")
      setGloves(glovesData.data)

      const faceMasksData = await axios.get("v2/products/facemasks")
      setFaceMasks(faceMasksData.data)

      const beaniesData = await axios.get("v2/products/beanies")
      setBeanies(beaniesData.data)
      
      const manus = [...new Set(beaniesData.data.map(data => data.manufacturer))]
      
      Promise.all(manus.map(manu => getAvailability(manu)))
      .then(results => {
          setManuFacturers(results)
      })
      .catch(err => {
          console.log(err)
      })
      .finally(()=>setLoading(false))
      
  }

    const getAvailability = async (manufacturName) => {
        let res = await axios.get(`v2/availability/${manufacturName}`)
        while(res.data.response === "[]"){
          res = await axios.get(`v2/availability/${manufacturName}`)
          console.log("response zero")
        }
        return {name:manufacturName,values:res.data.response}
    }
    

    getData()
    
  }, []);

  if(loading){
    return (
      <div className="App">
        <div className="nav">
            <h3>Shoppie</h3>
            <div>data is being loaded...</div>
        </div>
        
        </div>
    )
  }

  return (
    <div className="App">
      <Router>
      <Navbar/>
      <div>
        <Route path="/gloves" render={()=><Gloves gloves={gloves} manufacturers={manufacturers}/>}/>
        <Route path="/facemasks" render={()=><FaceMasks faceMasks={faceMasks} manufacturers={manufacturers}/>}/>
        <Route path="/beanies" render={()=><Beanies beanies={beanies} manufacturers={manufacturers}/>}/>
      </div>
        
      </Router>
      
    </div>
  );
}

export default App;
