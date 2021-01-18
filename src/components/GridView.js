import { FixedSizeGrid as Grid } from "react-window"
import { AutoSizer } from "react-virtualized"
import Product from "./Product"

const GridView = ({ products, manufacturers }) => {
  // this components is used for grid view.
  // React-window(FixedSizedGrid) and React- virtualized(Autosizer) are used for rendering huge amounts of data
  return (
    <div>
      <AutoSizer defaultWidth={400} defaultHeight={600}>
        {({ width, height }) => {
            // grid item Width and height
          const cardWidth = 315
          const cardHeight = 370
          //grid column and row count
          const columnCount = Math.floor(width / cardWidth)
          const rowCount = Math.ceil(products.length / columnCount)
          return (
            <Grid
              className="grid"
              width={window.screen.width}
              height={window.screen.height}
              columnCount={columnCount}
              columnWidth={cardWidth}
              rowCount={rowCount}
              rowHeight={cardHeight}
              itemData={{ products, columnCount }}
            >

              {({ columnIndex, rowIndex, style, data }) => {
                const { products, columnCount } = data
                const singleColumnIndex = columnIndex + rowIndex * columnCount
                const product = products[singleColumnIndex]
                return (
                  <Product
                    product={product}
                    style={style}
                    manufacturers={manufacturers}
                  />
                )
              }}
            </Grid>
          )
        }}
      </AutoSizer>
    </div>
  )
}

export default GridView
