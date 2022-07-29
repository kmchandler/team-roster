/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getTeams } from '../../api/teamsData';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';
import roles from '../../sample-data/roles.json';

const initialState = {
  imageUrl: '',
  name: '',
  teamId: '',
  role: [],
  phone: '',
  email: '',
  notes: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [checked, setChecked] = useState([]);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
      getTeams(user.uid).then(setTeams);
      setChecked(obj.role || []);
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
    formInput.role = checked;
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push('/members/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/members/team');
      });
    }
  };

  const handleClick = (e) => {
    let updatedRole = [...checked];
    if (e.target.checked) {
      updatedRole = [...checked, e.target.name];
    } else {
      updatedRole.splice(checked.indexOf(e.target.name), 1);
    }
    setChecked(updatedRole);
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

        <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select
            aria-label="Team"
            name="teamName"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select a Team</option>
            {
              teams.map((team) => (
                <option
                  key={team.firebaseKey}
                  value={team.firebaseKey}
                  selected={obj.teamId === team.firebaseKey}
                >
                  {team.teamName}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Phone Number" className="mb-3">
          <Form.Control type="tel" placeholder="123-456-7890" name="phone" value={formInput.phone} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="E-mail" className="mb-3">
          <Form.Control type="email" placeholder="E-mail" name="email" value={formInput.email} onChange={handleChange} />
        </FloatingLabel>

        <h5>Role</h5>
        {roles.map((role) => (
          <div key={role.id} className="mb-3">
            <Form.Check
              type="checkbox"
              id={role.id}
              label={role.type}
              checked={checked.indexOf(role.type) >= 0}
              onChange={handleClick}
              name={role.type}
            />
          </div>
        ))}

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
    role: PropTypes.arrayOf(PropTypes.string),
    teamId: PropTypes.string,
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
