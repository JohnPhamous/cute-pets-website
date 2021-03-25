import React, { useEffect, useState } from 'react';
import { getPets } from '../../api/petfinder';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getPetsData() {
      const petsData = await getPets();
      setData(petsData);
    }

    getPetsData();
  }, []);
  console.log(data);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {data.animals.map((animal) => (
        <Link key={animal.id} to={`/pet/details/${animal.id}`}>
          <p>{animal.name}</p>
          {animal.photos[0] && <img src={animal.photos[0].medium} alt="" />}
          <ul>
            <li>Mixed: {animal.breeds.mixed.toString()}</li>
            <li>Breed: {animal.breeds.primary}</li>
            <li>Color: {animal.colors.primary}</li>
            <li>Gender: {animal.gender}</li>
            <li>Size: {animal.size}</li>
            <li>Size: {animal.size}</li>
            <li>Species: {animal.species}</li>
          </ul>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
