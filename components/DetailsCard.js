import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function DetailsCard({ playerObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj.imageUrl} alt={playerObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerObj.name}</Card.Title>
        <p>Role: {playerObj.role}</p>
        <p>Phone: {playerObj.phone}</p>
        <p>E-mail: {playerObj.email}</p>
      </Card.Body>
    </Card>
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
