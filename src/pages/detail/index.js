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
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>{data.breeds.primary}</p>
      {data.photos.map((photo) => (
        <img src={photo.medium} key={photo.medium} alt="" />
      ))}
    </div>
  );
};

export default PetDetailsPage;
