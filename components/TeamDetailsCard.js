import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function TeamDetailsCard({ teamObj }) {
  return (
    <div className="teamDetailsCard">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img className="cardImage" variant="top" src={teamObj.imageUrl} alt={teamObj.teamName} style={{ height: '400px' }} />
        <Card.Body className="cardBody">
          <Card.Title className="TeamNameDetails">{teamObj.teamName}</Card.Title>
          <p className="teamLeadDetails">Team Lead:</p>
          <p className="teamPhoneDetails">Phone:</p>
          <p className="teamEmailDetails">E-mail:</p>
          <p className="teamFilmsDetails">Films:</p>
        </Card.Body>
      </Card>
    </div>
  );
}

TeamDetailsCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    teamName: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default TeamDetailsCard;
