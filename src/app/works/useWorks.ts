import { gql, useQuery } from '@apollo/client';
import Work from './Work';

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
        isoSpeedRating
        dateTime
        make
      }
    }
  }
`;

const useWorks = () => {
  const { data, loading } = useQuery<{ works: Work[] }>(getWorks);

  return { works: data?.works, loading };
};

export default useWorks;
