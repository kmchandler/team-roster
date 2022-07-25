import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function DetailsCard({ playerObj }) {
  return (
    <div className="detailsCard">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img className="cardImage" variant="top" src={playerObj.imageUrl} alt={playerObj.name} style={{ height: '400px' }} />
        <Card.Body className="cardBody">
          <Card.Title className="memberNameDetails">{playerObj.name}</Card.Title>
          <p className="memberRoleDetails">Role: {playerObj.role}</p>
          <p className="memberPhoneDetails">Phone: {playerObj.phone}</p>
          <p className="memberEmailDetails">E-mail: {playerObj.email}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

DetailsCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default DetailsCard;
