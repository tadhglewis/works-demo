import styled from 'styled-components';
import Work from './Work';

const Card = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const Item = ({ id }: Work) => <Card>{id}</Card>;

export default Item;
