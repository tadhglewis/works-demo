import styled from 'styled-components';
import Work, { Exif } from './Work';
import dayjs from 'dayjs';
import camelCaseToSentenace from '../../formatters/camelCaseToSentenceCase';

const Card = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

const ImageContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  display: block;
  height: 100%;
  position: absolute;
`;

const Details = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Detail = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 8px;
  border-radius: 12px;
  align-self: flex-start;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: rgb(69 134 255 / 10%);
  }
`;

const CreatedDateTime = styled.div`
  padding: 16px;
`;

interface ItemProps extends Work {
  addToFilter: (key: keyof Exif, value: string) => void;
}

const Item = ({ filename, urls, exif, addToFilter }: ItemProps) => {
  const details = Object.entries(exif).filter(
    (value) => value[0] !== '__typename' && value[0] !== 'dateTime' && value[1],
  );

  return (
    <Card>
      <ImageContainer
        href={urls.find(({ type }) => type === 'large')?.link}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={urls.find(({ type }) => type === 'small')?.link}
          alt={filename}
        />
      </ImageContainer>
      <Details>
        {details.map((detail) => (
          <Detail
            key={detail[0]}
            onClick={() => addToFilter(detail[0] as keyof Exif, detail[1])}
          >
            {camelCaseToSentenace(detail[0])}: {detail[1]}
          </Detail>
        ))}
      </Details>
      <CreatedDateTime>
        {dayjs(exif.dateTime).format('DD/MM/YYYY')}
      </CreatedDateTime>
    </Card>
  );
};

export default Item;
