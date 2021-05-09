import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  const [borders, setborders] = useState([]);

  useEffect(async () => {
    setborders(
      await Promise.all(country.borders.map((border) => getCountry(border)))
    );
  }, []);

  console.log(borders);

  return (
    <Layout title={country.name}>
      <MainContainer>
        <div className="ContainerLeft">
          <OverviewPanel>
            <Img src={country.flag} alt={country.name} />
            <CountryName>{country.name}</CountryName>
            <CountryRegion>{country.region}</CountryRegion>
            <Container>
              <div className="overview__population">
                <div className="overview__value">{country.population}</div>
                <div className="overview__label">Population</div>
              </div>
              <div className="overview__area">
                <div className="overview__value">{country.area}</div>
                <div className="overview__label">
                  Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
                </div>
              </div>
            </Container>
          </OverviewPanel>
        </div>
        <div className="ContainerRight">
          <DetailsPanel>
            <DetailHeading>Details</DetailHeading>
            <DetailsPanelRow>
              <div className="label">Capital</div>
              <div className="value">{country.capital}</div>
            </DetailsPanelRow>

            <DetailsPanelRow>
              <div className="label">Subregion</div>
              <div className="value">{country.subregion}</div>
            </DetailsPanelRow>

            <DetailsPanelRow>
              <div className="label">Languages</div>
              <div className="value">
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </DetailsPanelRow>

            <DetailsPanelRow>
              <div className="label">Currencies</div>
              <div className="value">
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </DetailsPanelRow>

            <DetailsPanelRow>
              <div className="label">Native name</div>
              <div className="value">{country.nativeName}</div>
            </DetailsPanelRow>

            <DetailsPanelRow>
              <div className="label">Gini</div>
              <div className="value">{country.gini} %</div>
            </DetailsPanelRow>

            <h3 className="Neighbouring">Neighbouring Countries</h3>
            <DetailsPanelBorders>
              {borders.map(({ flag, name, alpha3Code }) => (
                <Link href={`/country/${alpha3Code}`}>
                  <div className="border__country">
                    <img
                      src={flag}
                      alt={name}
                      className="border__countryImage"
                    />
                    <div className="border__countryName">{name}</div>
                  </div>
                </Link>
              ))}
            </DetailsPanelBorders>
          </DetailsPanel>
        </div>
      </MainContainer>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};

const OverviewPanel = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  background-color: var(--background-color-light);
`;

const Img = styled.img`
  width: 100%;
  max-width: 100%;
`;

const CountryName = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 0;
`;

const CountryRegion = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 24px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  text-align: center;

  .overview__label {
    font-size: 14px;
    color: var(--text-color-secondary);
  }
`;

const DetailsPanel = styled.div`
  background-color: var(--background-color-light);
  box-shadow: var(--box-shadow);
  border-radius: 8px;

  .Neighbouring {
    padding: 10px 0 5px 15px;
    color: var(--text-color-secondary);
    font-size: 16px;
    font-weight: 500;
  }
`;

const DetailHeading = styled.h4`
  padding: 20px;
  padding-bottom: 0px;
  font-weight: 500;
  font-size: 18px;

  @media screen and (min-width: 720px) {
    margin-top: 0;
  }
`;

const DetailsPanelRow = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 20px;
  border-bottom: 1px solid #e0e0e0;

  .label {
    color: var(--text-color-secondary);
  }
`;

const DetailsPanelBorders = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 24px;
  padding: 20px;

  .border__country {
    text-align: center;

    :hover {
      cursor: pointer;
    }
  }

  .border__countryImage {
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  }

  .border__countryName {
    color: var(--text-color-secondary);
    margin-bottom: 20px;
    margin-top: 5px;
  }
`;

const MainContainer = styled.div`
  @media screen and (min-width: 720px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;

    .ContainerLeft {
      grid-column: 1 / span 4;
    }

    .ContainerRight {
      grid-column: 5 / span 8;
    }
  }
`;
