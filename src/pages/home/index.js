import React, { useEffect, useState } from 'react';
import { getPets } from '../../api/petfinder';
import { Link, useParams } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    async function getPetsData() {
      const petsData = await getPets(type);
      setData(petsData);
    }

    getPetsData();
  }, [type]);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page">
      <h2>
        <span className="pet-type-label">{type ? `${type}s` : 'Pets'}</span>{' '}
        available for adoption near you
      </h2>
      <div className="grid">
        {data.map((animal) => (
          <Link
            key={animal.id}
            to={`/pet/details/${animal.id}`}
            className="pet"
          >
            <article>
              <div className="pet-image-container">
                {
                  <img
                    className="pet-image"
                    src={
                      animal.photos[0]?.medium ||
                      'https://i.imgur.com/aEcJUFK.png'
                    }
                    alt=""
                  />
                }
              </div>
              <h3>{animal.name}</h3>
              <p>Breed: {animal.breeds.primary}</p>
              <p>Color: {animal.colors.primary}</p>
              <p>Gender: {animal.gender}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
