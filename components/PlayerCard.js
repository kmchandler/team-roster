import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card className="playerCardDiv" style={{ width: '18rem', margin: '10px' }}>
        <Card.Img className="cardImage" variant="top" src={playerObj.imageUrl} alt={playerObj.name} style={{ height: '400px' }} />
        <Card.Body className="cardBody">
          <Card.Title>{playerObj.name}</Card.Title>
          <p className="playerCardTeam">Team: {playerObj.team}</p>
          <p className="playerCardJobs">Job: {playerObj?.role?.join(', ')}</p>
          <div className="playerCardBtns">
            <Link href={`/members/${playerObj.firebaseKey}`} passHref>
              <Button className="detailsButton">DETAILS</Button>
            </Link>
            <Link href={`/members/edit/${playerObj.firebaseKey}`} passHref>
              <Button className="editButton">EDIT</Button>
            </Link>
            <Button className="deleteButton m-2" onClick={deleteThisPlayer}>
              DELETE
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    team: PropTypes.string,
    role: PropTypes.arrayOf(PropTypes.string),
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
