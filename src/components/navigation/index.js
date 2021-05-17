import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getPetTypes } from '../../api/petfinder';
import Logo from '../../assets/logo.svg';
import Search from '../search';

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">
          <img src={Logo} alt="Petlover" />
        </Link>
        <Search />
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
        {petTypes.length > 0
          ? petTypes.map((type) => (
              <li key={type.name}>
                <NavLink
                  to={`/${type._links.self.href.split('/').pop()}`}
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
