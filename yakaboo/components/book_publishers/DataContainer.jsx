import { BookPublishersContainer } from '.';
import { AuthorsContainer } from '../author';

export const DataContainer = ({ bookPublishers = true }) => {
  return (
    <>{bookPublishers ? <BookPublishersContainer /> : <AuthorsContainer />}</>
  );
};
