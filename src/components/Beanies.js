import {useState, useEffect} from 'react'
import GridView from './GridView'
import ListView from './ListView'

const Beanies = ({ beanies,manufacturers }) => {

  // state for view change List or grid (Available for bigger screen only)
  const [view,setView] = useState('list')
  const [showButtons,setShowButtons] = useState(true)

  const changeView= (viewType)=>{
    setView(viewType)
  }

  // checking if the screen is bigger for grid view, otherwise Default list view is shown
  useEffect(()=>{
    const screenWidth = window.screen.width;
    if(screenWidth < 600){
      setShowButtons(false)
    }
  
  },[])

  // component for buttons to change view between grid /list 
  const Buttons = () => {
    
    if(showButtons){
      return(
        <div>
          <button className="button" onClick={()=>changeView('grid')}>Grid View</button>
          <button className="button" onClick={()=>changeView('list')}>List View</button>
        </div>
      )
      
    }
    return null

  }

  return (
    <div className="container">
      <h3>Beanies</h3>
      <Buttons/>
      { view === "list" ?
      <ListView products={beanies} manufacturers={manufacturers}/>
      :
      <GridView products={beanies} manufacturers={manufacturers}/>
      }
    </div>
  )
}

export default Beanies
