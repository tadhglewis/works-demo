import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import Work, { Exif } from './Work';

const getWorks = gql`
  query getWorks {
    works {
      id
      filename
      imageWidth
      imageHeight
      urls {
        type
        link
      }
      exif {
        model
        software
        isoSpeedRatings
        dateTime
        make
      }
    }
  }
`;

const useWorks = () => {
  const [filters, setFilters] = useState<Partial<Record<keyof Exif, string[]>>>(
    { make: ['Canon', 'LEICA'] },
  );
  const { data, loading, error } = useQuery<{ works: Work[] }>(getWorks);

  // Filtering should really be done backend and add a argument to the graphql query for exif details
  const filteredData = data?.works.filter(({ exif }) =>
    Object.keys(filters)
      .map((filterKey) =>
        filters[filterKey as keyof Exif]?.length
          ? filters[filterKey as keyof Exif]?.includes(
              exif[filterKey as keyof Exif],
            )
          : true,
      )
      .every((x) => Boolean(x)),
  );

  return {
    works: Object.keys(filters).length ? filteredData : data?.works,
    loading,
    error,
    addToFilter: (key: keyof Exif, value: string) =>
      setFilters((prev) => ({
        ...prev,
        [key]: [
          ...(prev[key] || []),
          ...(!prev[key]?.includes(value) ? [value] : []),
        ],
      })),
    removeFromFilter: (key: keyof Exif, valueToFilter: string) => {
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key]?.filter((value) => value !== valueToFilter),
      }));
    },
    filters,
  };
};

export default useWorks;
