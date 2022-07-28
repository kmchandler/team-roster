/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateTeam, createTeam } from '../../api/teamsData';

const initialState = {
  imageUrl: '',
  teamName: [],
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push('/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/teams');
      });
    }
  };

  return (
    <div className="teamFormContainer">
      <Form className="teamForm" onSubmit={handleSubmit}>
        <h2 className="formHeaderText mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Team</h2>
        <FloatingLabel controlId="floatingInput1" label="Enter Team Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Team Name" name="name" value={formInput.teamName} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Photo URL" className="mb-3">
          <Form.Control type="url" placeholder="Photo URL" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
        </FloatingLabel>

        <Button className="formButton" type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Team</Button>
      </Form>
    </div>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    teamName: PropTypes.arrayOf(PropTypes.string),
    uid: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
