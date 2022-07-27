/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { check } from 'prettier';
import { useAuth } from '../utils/context/authContext';
import { createPlayer, updatePlayer } from '../api/playerData';
import roles from '../sample-data/roles.json';

const initialState = {
  imageUrl: '',
  name: '',
  role: '',
  phone: '',
  email: '',
  notes: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
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
      updatePlayer(formInput)
        .then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/team');
      });
    }
  };

  return (
    <div className="memberFormContainer">
      <Form className="memberForm" onSubmit={handleSubmit}>
        <h2 className="formHeaderText mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Member</h2>
        <FloatingLabel controlId="floatingInput1" label="Enter First and Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Photo URL" className="mb-3">
          <Form.Control type="url" placeholder="Photo URL" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
        </FloatingLabel>

        <h5>Role</h5>
        <Form>
          {roles.map((role) => (
            <div key={roles.id} className="mb-3">
              <Form.Check
                type={check}
                id={role.id}
                label={role.type}
              />
            </div>
          ))}
        </Form>

        <FloatingLabel controlId="floatingInput2" label="Phone Number" className="mb-3">
          <Form.Control type="tel" placeholder="123-456-7890" name="phone" value={formInput.phone} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="E-mail" className="mb-3">
          <Form.Control type="email" placeholder="E-mail" name="email" value={formInput.email} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea" label="Additional Notes" className="mb-3">
          <Form.Control as="textarea" placeholder="Notes" style={{ height: '100px' }} name="notes" value={formInput.notes} onChange={handleChange} />
        </FloatingLabel>
        <Button className="formButton" type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Member</Button>
      </Form>
    </div>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    notes: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
