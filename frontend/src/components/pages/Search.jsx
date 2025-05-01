import { useMediaQuery } from 'react-responsive';
import SearchDesktop from '../layout/SearchDesktop';
import SearchMobile from '../layout/SearchMobile';

const Search = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <SearchDesktop /> : <SearchMobile />;
};

export default Search;
