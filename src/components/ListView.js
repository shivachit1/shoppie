import Product from "./Product"
import { FixedSizeList as List } from "react-window"

const ListView = ({ products, manufacturers }) => {

  // this components is used for list view.
  // React-window(FixedSizeList) is used for rendering huge amounts of data
  return (
    <div>
      <List
        height={window.screen.height}
        itemCount={products.length}
        itemSize={360}
        width="100%"
      >
        {({ index, style }) => (
          <Product
            product={products[index]}
            style={style}
            manufacturers={manufacturers}
          />
        )}
      </List>
    </div>
  )
}

export default ListView
