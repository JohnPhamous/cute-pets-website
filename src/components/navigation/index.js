import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPetTypes } from '../../api/petfinder';

const Navigation = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function getPetTypesData() {
      const petTypes = await getPetTypes();
      setData(petTypes);
    }

    getPetTypesData();
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {data ? (
            <ul>
              Types:{' '}
              {data.types.map((type) => (
                <>
                  <Link
                    to={`/${type._links.self.href.split('/').pop()}`}
                    key={type.name}
                  >
                    {type.name}
                  </Link>{' '}
                </>
              ))}
            </ul>
          ) : (
            'Loading...'
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
