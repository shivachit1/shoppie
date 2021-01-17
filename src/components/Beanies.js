import { FixedSizeList as List } from "react-window";
import Product from "./Product";

const Beanies = (props) => {
 
  return (
    <div className="products-container">
      <h3>Beanies</h3>
      <List
        height={window.screen.height}
        itemCount={props.beanies.length}
        itemSize={350}
        width="100%"
      >
          {({ index, style }) => 
          <Product product={props.beanies[index]} style={style} manufacturers={props.manufacturers} />
          }
        
      </List>
    </div>
  );
};

export default Beanies;
