import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const orderBy = (countries, direction, value) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  } else if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  } else if (direction === "desc") {
    return <KeyboardArrowDown color="inherit" />;
  } else if (direction === "asc") {
    return <KeyboardArrowUp color="inherit" />;
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountries = orderBy(countries, direction, value);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else if (direction === "asc") {
      setDirection("desc");
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <Container>
      <Heading>
        <HeadingFlag>
          <div>Flag</div>
        </HeadingFlag>
        <HeadingName
          onClick={() => {
            setValueAndDirection("name");
          }}
        >
          <div>Name</div>
          <SortArrow value="name" />
        </HeadingName>
        <HeadingPopulation
          onClick={() => {
            setValueAndDirection("population");
          }}
        >
          <div>Population</div>
          <SortArrow value="name" direction={direction} />
        </HeadingPopulation>

        <HeadingArea
          onClick={() => {
            setValueAndDirection("area");
          }}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
        </HeadingArea>

        <HeadingGini
          onClick={() => {
            setValueAndDirection("gini");
          }}
        >
          <div>Gini</div>
        </HeadingGini>
      </Heading>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <Row>
            <Flag>
              <img src={country.flag} alt={country.name} />
            </Flag>
            <Name>{country.name}</Name>
            <Population>{country.population}</Population>
            <Area>{!country.area ? "-" : country.area}</Area>
            <Gini>{!country.gini ? 0 : country.gini} %</Gini>
          </Row>
        </Link>
      ))}
    </Container>
  );
};

export default CountriesTable;

const Container = styled.div``;

const Heading = styled.div`
  display: flex;

  button {
    border: none;
    background-color: transparent;
  }
`;

const HeadingFlag = styled.div`
  flex: 1;
  padding: 20px;
  padding-right: 0px;
  color: var(--text-color-secondary);

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const HeadingName = styled.button`
  flex: 1;
  padding: 20px 5px;
  color: var(--text-color-secondary);
  font-weight: 500;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;

  .MuiSvgIcon-root {
    color: var(--primary-color);
    margin-left: 2px;
  }

  :hover {
    cursor: pointer;
  }
`;

const HeadingPopulation = styled.button`
  flex: 1;
  padding: 20px 5px;
  color: var(--text-color-secondary);
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiSvgIcon-root {
    color: var(--primary-color);
    margin-left: 2px;
  }

  :hover {
    cursor: pointer;
  }
`;

const HeadingArea = styled.div`
  flex: 1;
  padding: 20px 5px;
  color: var(--text-color-secondary);
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiSvgIcon-root {
    color: var(--primary-color);
    margin-left: 2px;
  }

  :hover {
    cursor: pointer;
  }
`;

const HeadingGini = styled.div`
  flex: 1;
  padding: 20px 5px;
  color: var(--text-color-secondary);
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiSvgIcon-root {
    color: var(--primary-color);
    margin-left: 2px;
  }

  @media screen and (max-width: 720px) {
    display: none;
  }

  :hover {
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: flex;
  padding: 10px 5px;
  align-items: center;

  text-align: center;
  background-color: var(--background-color-light);
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: var(--box-shadow);
  font-weight: 500;

  transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;

  @media screen and (min-width: 720px) {
    padding: 10px;
  }

  :hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const Flag = styled.div`
  img {
    max-width: 85px;
    object-fit: contain;
    border-radius: 8px;
  }
  flex: 1;
  margin-right: 5px;
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const Name = styled.div`
  flex: 1;
  text-align: left;
  padding: 0 5px;
`;

const Population = styled.div`
  flex: 1;
  padding: 0 5px;
`;

const Area = styled.div`
  flex: 1;
  padding: 0 5px;
`;

const Gini = styled.div`
  flex: 1;
  padding: 0 5px;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;
