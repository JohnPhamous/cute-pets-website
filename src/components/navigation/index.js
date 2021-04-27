import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getPetTypes } from '../../api/petfinder';
import Logo from '../../assets/logo.svg';

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
      <div className="nav-logo">
        <img src={Logo} alt="Petlover" />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className="nav-link"
            activeClassName="nav-link-active"
            exact
          >
            All Pets
          </NavLink>
        </li>
        {data
          ? data.types.map((type) => (
              <li>
                <NavLink
                  to={`/${type._links.self.href.split('/').pop()}`}
                  key={type.name}
                  className="nav-link"
                  activeClassName="nav-link-active"
                >
                  {type.name}s
                </NavLink>{' '}
              </li>
            ))
          : 'Loading...'}
      </ul>
    </nav>
  );
};

export default Navigation;
