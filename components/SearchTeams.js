import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Search({ setFilteredTeams, teams }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    const results = teams.filter((team) => team.teamName.toLowerCase().includes(value.toLowerCase()));
    setFilteredTeams(results);
  };
  return (
    <Form className="searchBar">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={input}
        name="teamSearch"
        onChange={handleChange}
      />
    </Form>
  );
}

Search.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape(
    {
      teamName: PropTypes.string,
    },
  )).isRequired,
  setFilteredTeams: PropTypes.func.isRequired,
};
