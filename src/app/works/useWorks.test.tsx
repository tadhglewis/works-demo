import { renderHook } from '@testing-library/react-hooks';
import useWorks, { getWorks } from './useWorks';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import Work from './Work';

describe('useWorks', () => {
  it('should add new filters', () => {
    const { result } = renderHook(() => useWorks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[]}>{children}</MockedProvider>
      ),
    });

    expect(result.current.filters).toStrictEqual([]);

    act(() => {
      result.current.addToFilter('model', 'testing model');
    });

    expect(result.current.filters).toStrictEqual([
      { key: 'model', value: 'testing model' },
    ]);
  });

  it('should remove from filters', () => {
    const { result } = renderHook(() => useWorks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[]}>{children}</MockedProvider>
      ),
    });

    expect(result.current.filters).toStrictEqual([]);

    act(() => {
      result.current.addToFilter('model', 'testing model');
    });

    expect(result.current.filters).toStrictEqual([
      { key: 'model', value: 'testing model' },
    ]);

    act(() => {
      result.current.removeFromFilter('model', 'testing model');
    });

    expect(result.current.filters).toStrictEqual([]);
  });

  it('should fetch works', async () => {
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

    const mocks: MockedResponse[] = [
      {
        request: {
          query: getWorks,
          variables: {},
        },
        result: {
          data: {
            works: [work],
          },
        },
      },
    ];

    const { result } = renderHook(() => useWorks(), {
      wrapper: ({ children }) => (
        <MockedProvider
          mocks={mocks}
          // avoid mock returning undefined when schema doesn't 100% match / https://github.com/apollographql/apollo-client/issues/7081
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          {children}
        </MockedProvider>
      ),
    });

    expect(result.current.loading).toEqual(true);

    await act(async () => {
      await waitFor(() => expect(result.current.loading).toEqual(false));
    });

    expect(result.current.works).toStrictEqual<Work[]>([work]);
  });
});
