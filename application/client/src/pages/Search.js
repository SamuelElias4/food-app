import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/Cards/DashboardCard';
import Filterbar from '../components/filterbar/Filterbar';
import { useHistory } from 'react-router-dom';

// MUI
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Bootstrap
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';

const Search = ({ location }) => {
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState('');

  const [filter, setfilter] = React.useState('');

  const handleChange = (event) => {
    setfilter(event.target.value);
  };

  const history = useHistory();

  useEffect(() => {
    const fetchResults = async () => {
      const query = new URLSearchParams(location.search).get('query');
      try {
        const response = await fetch(
          `${process.env.REACT_APP_REQ_URL}/search?query=${query}`
        );
        const data = await response.json();

        if (response.ok) {
          setResults(data.results);

          console.log('Results:', data.results[0].recipe_title);

          setTitle(data.results[0].recipe_title);
          console.log('Recipe title:', title);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [location.search]);

  const handleDashboardCardClick = (recipe_id) => {
    history.push(`/post/${recipe_id}`);
  };

  return (
    <>
      <Container>
        {/* <Filterbar title={title}/> */}

        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {results.length > 0 ? (
            results.map((result) => (
              <DashboardCard
                key={result.recipe_id}
                result={result}
                onClick={() => handleDashboardCardClick(result.recipe_id)}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No results found.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Search;
