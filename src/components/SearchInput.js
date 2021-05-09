import styled from "styled-components";
import { SearchRounded } from "@material-ui/icons";

const SearchInput = ({ ...rest }) => {
  return (
    <Container>
      <SearchRounded color="inherit" />
      <Input {...rest} />
    </Container>
  );
};

export default SearchInput;

const Container = styled.div`
  display: flex;
  flex: 0.6;
  align-items: center;
  background-color: var(--background-color-dark);
  border-radius: 8px;
  padding-left: 16px;
  color: var(--text-color-secondary);

  @media screen and (max-width: 720px) {
    flex-grow: 1;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  padding: 16px;
  width: 100%;
  height: 100%;
  outline: none;

  ::placeholder {
    color: var(--text-color-secondary);
    text-overflow: ellipsis;
  }
`;
