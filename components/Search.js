import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Search({ setFilteredPlayers, players }) {
  const [input, setInput] = useState('');

  const playerObj = players;

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    const results = playerObj.players.filter((player) => player?.name?.toLowerCase().includes(value.toLowerCase()) || player?.role?.toString().toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers({ players: results });
  };
  return (
    <Form className="searchBar">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={input}
        name="playerSearch"
        onChange={handleChange}
      />
    </Form>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string,
      role: PropTypes.arrayOf(PropTypes.string),
    },
  )).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
};
