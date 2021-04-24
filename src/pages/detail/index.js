import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetDetails } from '../../api/petfinder';

const PetDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    async function getPetsData() {
      const petsData = await getPetDetails(id);
      setData(petsData);
    }

    getPetsData();
  }, [id]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <div
        className="hero-container"
        style={{
          backgroundImage: `linear-gradient(black, black), url("${
            data.photos[1]?.full || 'https://i.imgur.com/aEcJUFK.png'
          }")
          `,
          backgroundBlendMode: 'saturation',
          backgroundSize: 'cover'
        }}
      >
        <h2>Meet Foo</h2>
        {/* <img
          src={data.photos[1]?.full || 'https://i.imgur.com/aEcJUFK.png'}
          alt=""
          className="pet-image"
        /> */}
      </div>
      <div className="pet-detail">
        <div className="pet-image-container">
          <img
            className="pet-image"
            src={data.photos[0]?.medium || 'https://i.imgur.com/aEcJUFK.png'}
            alt=""
          />
        </div>
        <div>
          <h1>{data.name}</h1>
          <h3>Breed: {data.breeds.primary}</h3>
          <p>Color: {data.colors.primary || 'Unknown'}</p>
          <p>Gender: {data.gender}</p>
          <h3>Description</h3>
          <p>{data.description}</p>
        </div>
      </div>
    </main>
  );
};

export default PetDetailsPage;
