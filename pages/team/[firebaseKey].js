/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { viewTeamDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import PlayerCard from '../../components/PlayerCard';
import Search from '../../components/Search';

export default function ViewAuthor() {
  const [teamMembers, setTeamMembers] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    viewTeamDetails(firebaseKey).then((playa) => {
      setTeamMembers(playa);
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
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
          ))}
        </div>
      </div>
    </>
  );
}
