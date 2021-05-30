import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import Work, { Exif } from './Work';

export const getWorks = gql`
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
    {},
  );
  const { data, loading, error } = useQuery<{ works: Work[] }>(getWorks, {
    onError: () => {
      window.alert('Error - an error occured');
    },
  });

  // Filtering should really be done backend and add a argument to the graphql query for exif details - client side filtering is bad
  const filteredData = data?.works.filter(({ exif }) =>
    (Object.keys(filters) as (keyof Exif)[])
      .map((filterKey) =>
        filters[filterKey]?.length
          ? filters[filterKey]?.includes(exif[filterKey] || '')
          : true,
      )
      .every((x) => Boolean(x)),
  );

  const addToFilter = (key: keyof Exif, value: string | undefined) =>
    setFilters((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        ...(value && !prev[key]?.includes(value) ? [value] : []),
      ],
    }));

  const removeFromFilter = (
    key: keyof Exif,
    valueToFilter: string | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key]?.filter((value) => value !== valueToFilter),
    }));
  };

  return {
    works: Object.keys(filters).length ? filteredData : data?.works,
    loading,
    error,
    addToFilter,
    removeFromFilter,
    filters: (Object.keys(filters) as (keyof Exif)[]).reduce<
      { key: keyof Exif; value: string }[]
    >((acc, filterKey) => {
      acc = [
        ...acc,
        ...(filters[filterKey]?.map((filter) => ({
          key: filterKey,
          value: filter,
        })) || []),
      ];
      return acc;
    }, []),
  };
};

export default useWorks;
