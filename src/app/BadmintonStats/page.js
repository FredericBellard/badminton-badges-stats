"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Trophy, Zap, Award } from 'lucide-react';
import BadmintonExportCsv from '../BadmintonExportCsv/page';

function BadmintonStats() {
  const [matchData, setMatchData] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('player1');

  useEffect(() => {
    fetch("/api/badminton-stats")
      .then((res) => res.json())
      .then((data) => {
        setMatchData(data);
      })
      .catch((err) => console.error("Erreur API :", err));
  }, []);

  if (!matchData) return <div>Chargement des statistiques...</div>;

  const currentPlayer = matchData?.[selectedPlayer];

  const colors = {
    direct: '#ef4444',
    faute: '#f97316',
    maladresse: '#eab308',
    chance: '#3b82f6'
  };

  const pieColors = [colors.chance, colors.direct, colors.faute, colors.maladresse];

  const BadgeCard = ({ type, count, icon: Icon, color }) => (
    <div className={`${color} rounded-lg p-4 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{type}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <Icon className="h-8 w-8 opacity-80" />
      </div>
    </div>
  );

  const CourtVisualization = () => {
    if (!currentPlayer || !currentPlayer.pointsByZone) return null;

    const zoneColors = currentPlayer.pointsByZone.map(zone => {
      const intensity = Math.min(zone.points / 6, 1);
      return `rgba(59, 130, 246, ${0.2 + intensity * 0.6})`;
    });

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Répartition des Points sur le Terrain</h3>
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto border-2 border-gray-400 p-4">
          {currentPlayer.pointsByZone.map((zone, index) => (
            <div
              key={index}
              className="aspect-square border border-gray-300 flex flex-col items-center justify-center text-sm font-semibold relative"
              style={{ backgroundColor: zoneColors[index] }}
            >
              <div className="text-lg font-bold">{zone.points}</div>
              <div className="text-xs text-gray-600">Zone {index + 1}</div>
              <div className="absolute top-1 right-1 flex gap-1">
                {zone.direct > 0 && <div className="w-2 h-2 bg-red-500 rounded-full" title="Points directs"></div>}
                {zone.faute > 0 && <div className="w-2 h-2 bg-orange-500 rounded-full" title="Fautes provoquées"></div>}
                {zone.maladresse > 0 && <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Maladresses"></div>}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Points directs</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Fautes provoquées</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Maladresses</span>
          </div>
        </div>
      </div>
    );
  };

  return (
      <div className="min-h-screen bg-gray-50 p-6">
      {matchData ? (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Statistiques de Match - Badminton
          </h1>
          
          {/* Sélecteur de joueur */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setSelectedPlayer('player1')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedPlayer === 'player1' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {matchData.player1?.name} ({matchData.player1?.totalPoints})
            </button>
            <button
              onClick={() => setSelectedPlayer('player2')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedPlayer === 'player2' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {matchData.player2?.name} ({matchData.player2?.totalPoints})
            </button>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <BadgeCard 
              type="Badges Bronze" 
              count={currentPlayer.badges?.bronze} 
              icon={Award} 
              color="bg-amber-600" 
            />
            <BadgeCard 
              type="Badges Argent" 
              count={currentPlayer.badges?.silver} 
              icon={Award} 
              color="bg-gray-500" 
            />
            <BadgeCard 
              type="Badges Or" 
              count={currentPlayer.badges?.gold} 
              icon={Trophy} 
              color="bg-yellow-500" 
            />
            <BadgeCard 
              type="Badges Smash" 
              count={currentPlayer.badges?.smash} 
              icon={Zap} 
              color="bg-purple-600" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Visualisation du terrain */}
          <CourtVisualization />

          {/* Répartition des types de points */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Répartition des Types de Points</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentPlayer.pointTypes}
                  cx="40%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {currentPlayer.pointTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Points par zone */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Points Marqués par Zone</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentPlayer.pointsByZone}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="zone" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="direct" stackId="a" fill="#ef4444" name="Points directs" />
                <Bar dataKey="faute" stackId="a" fill="#f97316" name="Fautes provoquées" />
                <Bar dataKey="maladresse" stackId="a" fill="#eab308" name="Maladresses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Efficacité des frappes */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Efficacité des Frappes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentPlayer.strokes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Tentatives" />
                <Bar dataKey="points" fill="#10b981" name="Points marqués" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparaison des joueurs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Comparaison des Joueurs</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={[
                {
                  metric: 'Points directs',
                  joueurA: matchData.player1?.pointTypes?.[0]?.count ?? 0,
                  joueurB: matchData.player2?.pointTypes?.[0]?.count ?? 0,
                },
                {
                  metric: 'Fautes provoquées',
                  joueurA: matchData.player1?.pointTypes?.[1]?.count ?? 0,
                  joueurB: matchData.player2?.pointTypes?.[1]?.count ?? 0,
                },
                {
                  metric: 'Badges Or',
                  joueurA: matchData.player1?.badges?.gold * 3,
                  joueurB: matchData.player2?.badges?.gold * 3,
                },
                {
                  metric: 'Badges Smash',
                  joueurA: matchData.player1?.badges?.smash * 2,
                  joueurB: matchData.player2?.badges?.smash * 2,
                },
                {
                  metric: 'Variété frappes',
                  joueurA: matchData.player1?.strokes?.length,
                  joueurB: matchData.player2?.strokes?.length,
                }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar
                  name={matchData.player1?.name}
                  dataKey="joueurA"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
                <Radar
                  name={matchData.player2?.name}
                  dataKey="joueurB"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              <h4 className="font-semibold">Résumé du Match</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Score final:</span>
                  <span className="font-semibold">
                    {matchData.player1?.totalPoints} - {matchData.player2?.totalPoints}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Vainqueur:</span>
                  <span className="font-semibold text-blue-600">
                    {matchData.player1?.totalPoints > matchData.player2?.totalPoints 
                      ? matchData.player1?.name 
                      : matchData.player2?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total badges or:</span>
                  <span className="font-semibold">
                    {matchData.player1?.badges?.gold + matchData.player2?.badges?.gold}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total smashs:</span>
                  <span className="font-semibold">
                    {matchData.player1?.badges?.smash + matchData.player2?.badges?.smash}
                  </span>
                </div>
                <BadmintonExportCsv matchData={matchData}/>
              </div>
            </div>
          </div>
        </div>
      </div>) : (
      <div>Pas de données...</div>
    )}
    </div>
  );
};

export default BadmintonStats;
