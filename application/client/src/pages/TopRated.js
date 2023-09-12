import React, { useState, useEffect } from 'react';
import { PostsData } from '../PostsData';
import { useHistory } from "react-router-dom";

import DashboardCard from '../components/Cards/DashboardCard'
import FilterbarStatic from '../components/filterbar/FilterbarStatic';

// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// This is the TopRated page. It is the page that displays the top rated recipes.
const TopRated = () => {
    const history = useHistory();
    const name = {recipe_title: 'Top Rated'}
    const [popular, setPopular] = useState([]);

    // filter from highest rating 
    const handlePopularFilter = () => {
      console.log("before sort: " + JSON.stringify(PostsData));

      PostsData.sort((a, b) => {
          return b.rating - a.rating;
      });
      setPopular(PostsData)
      return PostsData;
    }
 
    // reload cards for filter applied
    useEffect(() => {
     console.log('reload');
    }, []);


    return (
      <>
        <FilterbarStatic title={name} popularFilter={handlePopularFilter}/>

        <Container style={{ maxWidth: '80%' }}>
            <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* if popular array isn't empty load filter array */}
              {popular.length !== 0 ? (
                <>
                  {PostsData.map(data => (
                        <DashboardCard  result={data}  onClick={() => history.push(`post/${data.id}`)}/>
                    ))}
                </>
              ) : (
                <>
                  {PostsData.map(data => (
                      <DashboardCard  result={data}  onClick={() => history.push(`post/${data.id}`)}/>
                  ))}
                </>
              )}
            </Row>
        </Container>
      </>
    );
};

export default TopRated;