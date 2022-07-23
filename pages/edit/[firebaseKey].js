import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PlayerForm from '../new';
import { getSinglePlayer } from '../../api/playerData';

export default function EditAuthor() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<PlayerForm obj={editItem} />);
}
