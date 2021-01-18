import { useEffect } from 'react'
import { useState } from 'react'

const Product = ({ product, style, manufacturers }) => {
    
    // state for product availability
    const [availability, setAvailability] = useState('checking stock ...')

    useEffect(()=>{
        if(manufacturers.length !== 0){
            
            // getting all manufacturer products of given product.manufacturer
            const manu = manufacturers.find(manufacturer => manufacturer.name === product.manufacturer)
            
            // finding single product from array which matches the product id
            const stockCheck = manu.values.find((value) => {
            if(value.id.toLowerCase() === product.id.toLowerCase()){
                return value
            }
            return null

        })

        // slicing down DATAPAYLOAD string value to get the stock availability
        if(stockCheck !== null){
            let length = "<INSTOCKVALUE>".length
            let start = stockCheck.DATAPAYLOAD.indexOf("<INSTOCKVALUE>")
            let end = stockCheck.DATAPAYLOAD.indexOf("</INSTOCKVALUE>")
            let stockValue = stockCheck.DATAPAYLOAD.slice( start + length, end)
            setAvailability(stockValue)
        }

        }

    },[product,manufacturers])

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
            <p className="green-text">{availability}</p>
            <p>Category: {product.type}</p>
            <p className="small-text">product ID: {product.id}</p>
        </div>
        </div>
       
    )
}

export default Product