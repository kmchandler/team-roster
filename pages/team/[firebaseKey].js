/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Button from 'react-bootstrap/Button';
import { viewTeamDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import PlayerCard from '../../components/PlayerCard';
import Search from '../../components/Search';

  <Head>
    <title>ROOST</title>
    <meta name="description" content="Meta description for the team page" />
  </Head>;

export default function ViewTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  const [teamName, setTeamName] = useState('');

  const getAllThePlayers = () => {
    viewTeamDetails(firebaseKey).then((teamPlayers) => {
      setTeamMembers(teamPlayers);
      setFilteredPlayers(teamPlayers);
      setTeamName(teamPlayers.teamName);
    });
  };

  useEffect(() => {
    getAllThePlayers();
  }, [firebaseKey, user]);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <h1 className="teamName">Meet the Team</h1>
        <div className="teamHeaderDiv">
          <Search players={teamMembers} setFilteredPlayers={setFilteredPlayers} />
          <Link href="/members/new" passHref>
            <Button className="teamButton">Add A Team Member</Button>
          </Link>
        </div>
        <div className="d-flex flex-wrap cardContainer">
          {filteredPlayers?.players?.map((player) => (
            <PlayerCard key={player.firebaseKey} teamName={teamName} playerObj={player} onUpdate={getAllThePlayers} />
          ))}
        </div>
      </div>
    </>
  );
}
