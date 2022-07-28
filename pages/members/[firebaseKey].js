import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../api/playerData';
import DetailsCard from '../../components/DetailsCard';

export default function EditMemberDetails() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<DetailsCard playerObj={editItem} />);
}
