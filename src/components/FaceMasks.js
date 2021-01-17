import Product from "./Product";
import { FixedSizeList as List } from "react-window";

const FaceMasks = (props) => {

  return (
    <div className="products-container">
      <h3>Face Masks</h3>
      <List
        height={window.screen.height}
        itemCount={props.faceMasks.length}
        itemSize={350}
        width="100%"
      >
          {({ index, style }) => 
            <Product product={props.faceMasks[index]} style={style} manufacturers={props.manufacturers}/>
          }
        
      </List>
    </div>
  );
};

export default FaceMasks;
