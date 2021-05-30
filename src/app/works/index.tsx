import styled from 'styled-components';
import camelCaseToSentenace from '../../formatters/camelCaseToSentenceCase';
import Skeleton from '../../ui/skeleton';
import Item from './item';
import useWorks from './useWorks';

const WorksBox = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: column;
`;

const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
`;

const Filter = styled.span`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 8px;
  border-radius: 12px;
  align-self: flex-start;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: rgb(255 69 69 / 10%);
  }
`;

const Operand = styled.span`
  color: #555555;
`;

const Works = () => {
  const { works, loading, error, addToFilter, removeFromFilter, filters } =
    useWorks();

  return (
    <div>
      <Filters>
        {filters.map(({ key, value }) => (
          <Filter
            key={key + value}
            onClick={() => removeFromFilter(key, value)}
          >
            {camelCaseToSentenace(key)} <Operand>equals</Operand> {value} ×
          </Filter>
        ))}
      </Filters>
      <WorksBox>
        {error?.message}
        {!loading ? (
          works?.map((work) => (
            <Item key={work.id} {...work} addToFilter={addToFilter} />
          ))
        ) : (
          <>
            <Skeleton height={150} />
            <Skeleton height={150} />
            <Skeleton height={150} />
          </>
        )}
      </WorksBox>
    </div>
  );
};

export default Works;
