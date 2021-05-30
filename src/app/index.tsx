import styled from 'styled-components';
import ModernLayout from '../layout/ModernLayout';
import Works from './works';

const Title = styled.h1`
  text-align: center;
`;

const App = () => (
  <ModernLayout>
    <Title>Products Demo</Title>
    <Works />
  </ModernLayout>
);

export default App;
