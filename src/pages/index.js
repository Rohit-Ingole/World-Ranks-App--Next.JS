import { useState } from "react";
import styled from "styled-components";
import CountriesTable from "../components/CountriesTable";
import Layout from "../components/Layout";
import SearchInput from "../components/SearchInput";

const Home = ({ countries }) => {
  const [keyword, setkeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setkeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <InputContainer>
        <Count>Found {countries.length} countries</Count>
        <SearchInput
          placeholder="Filter by Name, Region or SubRegion"
          onChange={onInputChange}
          className="SearchInput"
        />
      </InputContainer>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};

const Count = styled.div`
  margin: 12px 0;
  color: var(--text-color-secondary);

  @media screen and (max-width: 720px) {
    width: 100px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
