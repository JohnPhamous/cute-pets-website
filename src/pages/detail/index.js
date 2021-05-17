import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getPetDetails } from '../../api/petfinder';
import Hero from '../../components/hero';

const PetDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function getPetsData() {
      try {
        const petsData = await getPetDetails(id);
        setData(petsData);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getPetsData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <main className="page">
          <h3>404: Who let the dogs out?</h3>
          <img
            src="https://i.chzbgr.com/full/8362031616/h9EB970C5/weve-lost-our-corgination"
            alt=""
          />
          <div className="actions-container">
            <button onClick={() => history.goBack()} className="button">
              Go Back
            </button>
            <Link to="/" className="button">
              Go Home
            </Link>
          </div>
        </main>
      ) : (
        <main>
          <Hero
            image={data.photos[1]?.full || 'https://i.imgur.com/aEcJUFK.png'}
            displayText={`Meet ${data.name}`}
          />
          <div className="pet-detail">
            <div className="pet-image-container">
              <img
                className="pet-image"
                src={
                  data.photos[0]?.medium || 'https://i.imgur.com/aEcJUFK.png'
                }
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
      )}
    </div>
  );
};

export default PetDetailsPage;
