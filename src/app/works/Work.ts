type WorkUrl = {
  type: string;
  link: string;
};

type Exif = {
  model: string;
  software: string;
  isoSpeedRatings: string;
  dateTime: string;
  make: string;
};

type Work = {
  id: string;
  filename: string;
  imageWidth: string;
  imageHeight: string;
  urls: WorkUrl[];
  exif: Exif;
};

export default Work;
