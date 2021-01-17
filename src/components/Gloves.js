
import Product from "./Product"
import { FixedSizeList as List } from "react-window"

const Gloves = (props) => {

  return (
    <div className="container">
      <h3>Gloves</h3>
      <List
        height={window.screen.height}
        itemCount={props.gloves.length}
        itemSize={360}
        width="100%"
      >
        {({ index, style }) => (
          <Product product={props.gloves[index]} style={style} manufacturers={props.manufacturers}/>
        )}
      </List>
    </div>
  );
};

export default Gloves;
