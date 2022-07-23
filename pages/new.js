import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createPlayer, updatePlayer } from '../api/playerData';

const initialState = {
  imageUrl: '',
  name: '',
  role: '',
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
        .then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/team');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Member</h2>
      <FloatingLabel controlId="floatingInput1" label="Enter First and Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Photo URL" className="mb-3">
        <Form.Control type="url" placeholder="Photo URL" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Team Member's Role">
        <Form.Select
          aria-label="Role"
          name="role"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option disabled selected key="empty" value="">Select A Role</option>
          <option value="Actor">Actor</option>
          <option value="Assistant Director">Assistant Director</option>
          <option value="Camera Operator">Camera Operator</option>
          <option value="Director">Director</option>
          <option value="Editor">Editor</option>
          <option value="Foley">Foley</option>
          <option value="Sound Operator">Sound Operator</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Additional Notes" className="mb-3">
        <Form.Control as="textarea" placeholder="Notes" style={{ height: '100px' }} name="notes" value={formInput.notes} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Member</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    notes: PropTypes.string,
    uid: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
