import Item from './item';
import useWorks from './useWorks';

const Products = () => {
  const { works } = useWorks();

  return (
    <div>
      {works?.map((work) => (
        <Item {...work} />
      ))}
    </div>
  );
};

export default Products;
