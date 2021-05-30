import { render, screen } from '@testing-library/react';
import ModernLayout from './modernLayout';

describe('modernLayout', () => {
  it('should match snapshot', async () => {
    const { container, getByText } = render(
      <ModernLayout>
        <p>Hello</p>
      </ModernLayout>,
    );

    expect(getByText('Hello')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
