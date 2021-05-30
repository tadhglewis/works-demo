import { ReactNode } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
`;

const ModernLayout = ({ children }: { children: ReactNode }) => (
  <Box>{children}</Box>
);

export default ModernLayout;
