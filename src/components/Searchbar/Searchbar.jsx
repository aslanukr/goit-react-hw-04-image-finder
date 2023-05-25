import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import {
  Header,
  Logo,
  LogoDot,
  LogoLink,
  LogoText,
  LogoWrapper,
  SearchForInput,
  SearchForm,
  SearchFormButton,
} from './Searchbar.styled';
import pixelLogo from '../../images/pixel.png';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const searchInputHandler = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input.trim());
    setInput('');
  };

  return (
    <>
      <Header>
        <LogoWrapper>
          <LogoLink href="">
            <Logo src={pixelLogo} alt="pixel logo" />
            <LogoText>
              <LogoDot>.</LogoDot>picsEl
            </LogoText>
          </LogoLink>
        </LogoWrapper>

        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch size={24} color="red" />
          </SearchFormButton>

          <SearchForInput
            onChange={searchInputHandler}
            type="text"
            name="input"
            value={input}
            autoComplete="off"
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
