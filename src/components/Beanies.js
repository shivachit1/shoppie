import { FixedSizeList as List } from "react-window";
import Product from "./Product";

const Beanies = (props) => {
 
  return (
    <div className="container">
      <h3>Beanies</h3>
      <List
        height={window.screen.height}
        itemCount={props.beanies.length}
        itemSize={360}
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
