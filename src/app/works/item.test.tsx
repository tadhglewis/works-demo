import { fireEvent, render, screen } from '@testing-library/react';
import Item from './item';
import Work from './Work';

describe('item', () => {
  const work: Work = {
    id: '31820',
    filename: '162042.jpg',
    imageWidth: '2206',
    imageHeight: '2205',
    urls: [
      {
        type: 'small',
        link: 'http://ih1.redbubble.net/work.31820.1.flat,135x135,075,f.jpg',
      },
      {
        type: 'medium',
        link: 'http://ih1.redbubble.net/work.31820.1.flat,300x300,075,f.jpg',
      },
      {
        type: 'large',
        link: 'http://ih1.redbubble.net/work.31820.1.flat,550x550,075,f.jpg',
      },
    ],
    exif: {
      model: 'NIKON D80',
    },
  };

  it('should match snapshot', async () => {
    const { container } = render(<Item {...work} addToFilter={jest.fn()} />);

    fireEvent.click(screen.getByText('Model: NIKON D80'));

    expect(container).toMatchSnapshot();
  });

  it('should call addToFilter when detail is clicked', () => {
    const addToFilterMock = jest.fn();

    render(<Item {...work} addToFilter={addToFilterMock} />);

    fireEvent.click(screen.getByText('Model: NIKON D80'));

    expect(addToFilterMock).toHaveBeenCalledWith('model', 'NIKON D80');
  });
});
