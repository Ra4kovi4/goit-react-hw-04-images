import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SubmitButton,
  //   SearchButtonLabel,
  Input,
} from './SearchBar.styled';
// import { GoSearch } from 'react-icons/go';
import { FcSearch } from 'react-icons/fc';

export const SearchBar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SubmitButton type="submit">
          <FcSearch size={30} />
        </SubmitButton>

        <Input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
