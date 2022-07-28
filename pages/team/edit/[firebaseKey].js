import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamsData';
import TeamForm from '../new';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<TeamForm obj={editItem} />);
}
