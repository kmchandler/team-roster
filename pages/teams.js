/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamsData';
import SearchTeams from '../components/SearchTeams';
import TeamCard from '../components/TeamCard';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const { user } = useAuth();

  const getAllTheTeams = () => {
    getTeams(user.uid).then((team) => {
      setTeams(team);
      setFilteredTeams(team);
    });
  };

  useEffect(() => {
    getAllTheTeams();
  }, [user]);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <h1 className="teamName">Teams</h1>
        <div className="teamHeaderDiv">
          <SearchTeams teams={teams} setFilteredTeams={setFilteredTeams} />
          <Link href="/team/new" passHref>
            <Button className="teamButton">Add A Team</Button>
          </Link>
        </div>
        <div className="d-flex flex-wrap cardContainer">
          {filteredTeams.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
          ))}
        </div>
      </div>
    </>
  );
}
