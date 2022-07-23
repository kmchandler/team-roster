/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

export default function Team() {
  const [players, setPlayers] = useState([]);

  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllThePlayers();
  }, [user]);

  return (
    <div className="text-center my-4 teamCardsDiv">
      <h1 className="teamName">Meet the Jigawatts</h1>
      <Link href="/new" passHref>
        <Button className="teamButton">Add A Team Member</Button>
      </Link>
      <div className="d-flex flex-wrap cardContainer">
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
        ))}
      </div>
    </div>
  );
}
