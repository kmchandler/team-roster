import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTeam } from '../api/teamsData';

function TeamCard({ teamObj, onUpdate }) {
  console.warn(teamObj);
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.teamName}?`)) {
      deleteSingleTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card className="memberCardDiv" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="cardImage" variant="top" src={teamObj.imageUrl} alt={teamObj.teamName} style={{ height: '400px' }} />
      <Card.Body className="cardBody">
        <Card.Title>{teamObj.teamName}</Card.Title>
        <div className="memberCardBtns">
          <Link href={`/members/${teamObj.firebaseKey}`} passHref>
            <Button className="detailsButton">MEMBERS</Button>
          </Link>
          <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
            <Button className="editButton">EDIT</Button>
          </Link>
          <Button className="deleteButton m-2" onClick={deleteThisTeam}>
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    teamName: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
