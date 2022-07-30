import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamsData';
import TeamForm from '../new';

  <Head>
    <title>ROOST</title>
    <meta name="description" content="Meta description for the team page" />
  </Head>;

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<TeamForm obj={editItem} />);
}
