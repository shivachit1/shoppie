import { useEffect } from 'react';
import { useState } from 'react';

const Product = ({product,style, manufacturers}) => {
    
    const [availability, setAvailability] = useState()

    useEffect(()=>{
        const manu = manufacturers.find(manufacturer => manufacturer.name === product.manufacturer)
        const stockCheck = manu.values.find((value) => {
            if(value.id.toLowerCase() === product.id.toLowerCase()){
                return value
            }
            return null
        })
        
        if(stockCheck !== null){
            let length = "<INSTOCKVALUE>".length
            let start = stockCheck.DATAPAYLOAD.indexOf("<INSTOCKVALUE>")
            let end = stockCheck.DATAPAYLOAD.indexOf("</INSTOCKVALUE>")
            let stockValue = stockCheck.DATAPAYLOAD.slice(start+length,end)
            setAvailability(stockValue)
        }

    },[])

    return(
        <div style={style}>
        <div className="product">
            <h3>{product.name}</h3>
            <h4>Manufacturer : {product.manufacturer}</h4>
            
            <h4>Price : {product.price}</h4>
            <div>colors available:</div>
            <div>
            {product.color.map(color=>(
                <span key={color} className="color" style={{background:color}}></span>
            ))}
            </div>
            <p className="button">{availability}</p>
            <p>Category: {product.type}</p>
            <p className="small-text">product ID: {product.id}</p>
        </div>
        </div>
       
    )
}

export default Product