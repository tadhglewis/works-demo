import styled from 'styled-components';
import ModernLayout from '../layout/modernLayout';
import Works from './works';

const Title = styled.h1`
  text-align: center;
`;

const App = () => (
  <ModernLayout>
    <Title>Works Demo</Title>
    <Works />
  </ModernLayout>
);

export default App;
