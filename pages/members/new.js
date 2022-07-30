import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSinglePlayer } from '../../api/playerData';
import MemberForm from '../../components/MemberForm';

  <Head>
    <title>ROOST</title>
    <meta name="description" content="Meta description for the team page" />
  </Head>;

export default function AddMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<MemberForm playerObj={editItem} />);
}
