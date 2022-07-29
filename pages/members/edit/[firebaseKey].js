import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSinglePlayer } from '../../../api/playerData';
import MemberForm from '../../../components/MemberForm';

export default function EditMembers() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<MemberForm obj={editItem} />);
}
