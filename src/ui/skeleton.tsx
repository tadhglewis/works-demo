import styled from 'styled-components';

const Skeleton = styled.div<{ width?: number; height: number }>`
  background-color: #f7f8f9;
  display: block;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => `${props.height}px`};
  border-radius: 3px;
`;

export default Skeleton;
