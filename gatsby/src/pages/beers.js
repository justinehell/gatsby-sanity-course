import React from 'react';
import { graphql } from 'gatsby';
import BeerList from '../components/BeerList';

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in Only !
      </h2>
      <BeerList beers={beers} />
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
