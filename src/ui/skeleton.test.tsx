import { render } from '@testing-library/react';
import Skeleton from './skeleton';

describe('skeleton', () => {
  it('should match snapshot', async () => {
    const { container } = render(<Skeleton height={300} />);

    expect(container).toMatchSnapshot();
  });
});
