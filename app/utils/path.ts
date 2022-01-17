import basePath from 'path';

const path = (...paths: string[]) => {
  return basePath.join(__dirname, '..', ...paths);
};

export default path;
