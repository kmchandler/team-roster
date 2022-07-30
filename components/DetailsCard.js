import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';

function DetailsCard({ playerObj }) {
  return (
    <>
      <div className="prevPage">
        {/* <Link href="/members/team" passHref>
          <Button className="editButton prevPageButton">Previous Page</Button>
        </Link> */}
      </div>
      <div className="detailsCard">
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img className="cardImage" variant="top" src={playerObj.imageUrl} alt={playerObj.name} style={{ height: '400px' }} />
          <Card.Body className="cardBody">
            <Card.Title className="memberNameDetails">{playerObj.name}</Card.Title>
            <p className="memberRoleDetails">Job: {playerObj?.role?.join(', ')}</p>
            <p className="memberPhoneDetails">Phone: {playerObj.phone}</p>
            <p className="memberEmailDetails">E-mail: {playerObj.email}</p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

DetailsCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.arrayOf(PropTypes.string),
    phone: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default DetailsCard;
