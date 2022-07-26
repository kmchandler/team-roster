/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getPlayers } from '../../api/playerData';
import PlayerCard from '../../components/PlayerCard';
import Search from '../../components/Search';

  <Head>
    <title>ROOST</title>
    <meta name="description" content="Meta description for the team page" />
  </Head>;

export default function Team() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid).then((playa) => {
      setPlayers(playa);
      setFilteredPlayers(playa);
    });
  };

  useEffect(() => {
    getAllThePlayers();
  }, [user]);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <h1 className="teamName">Meet the Team</h1>
        <div className="teamHeaderDiv">
          <Search players={players} setFilteredPlayers={setFilteredPlayers} />
          <Link href="/members/new" passHref>
            <Button className="teamButton">Add A Team Member</Button>
          </Link>
        </div>
        <div className="d-flex flex-wrap cardContainer">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
          ))}
        </div>
      </div>
    </>
  );
}
