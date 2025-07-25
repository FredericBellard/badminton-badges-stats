export function GET() {
  const matchData = {
    player1: {
      name: "Joueur A",
      totalPoints: 21,
      pointsByZone: [
        { zone: "Zone 1 (avant-gauche)", points: 4, direct: 2, faute: 1, maladresse: 1, chance: 0 },
        { zone: "Zone 2 (avant-centre)", points: 3, direct: 2, faute: 1, maladresse: 0, chance: 0 },
        { zone: "Zone 3 (avant-droite)", points: 2, direct: 1, faute: 1, maladresse: 0, chance: 0 },
        { zone: "Zone 4 (milieu-gauche)", points: 5, direct: 3, faute: 2, maladresse: 0, chance: 0 },
        { zone: "Zone 5 (milieu-centre)", points: 3, direct: 2, faute: 1, maladresse: 0, chance: 0 },
        { zone: "Zone 6 (milieu-droite)", points: 4, direct: 2, faute: 1, maladresse: 1, chance: 0 }
      ],
      pointTypes: [
        { type: "Points directs", count: 12, percentage: 57.1 },
        { type: "Fautes provoquées", count: 7, percentage: 33.3 },
        { type: "Maladresses adverses", count: 2, percentage: 9.5 },
        { type: "Coups de chance", count: 0, percentage: 0 }
      ],
      strokes: [
        { type: "Amorti", count: 8, points: 4 },
        { type: "Smash", count: 12, points: 4 },
        { type: "Drive", count: 10, points: 5 },
        { type: "Dégagé", count: 6, points: 3 },
        { type: "Coup gagnant", count: 4, points: 2 },
        { type: "Autres", count: 8, points: 3 }
      ],
      badges: {
        bronze: 4,
        silver: 2,
        gold: 1,
        smash: 2
      }
    },
    player2: {
      name: "Joueur B",
      totalPoints: 18,
      pointsByZone: [
        { zone: "Zone 1 (avant-gauche)", points: 3, direct: 1, faute: 1, maladresse: 1, chance: 0 },
        { zone: "Zone 2 (avant-centre)", points: 2, direct: 1, faute: 1, maladresse: 0, chance: 0 },
        { zone: "Zone 3 (avant-droite)", points: 3, direct: 2, faute: 1, maladresse: 0, chance: 0 },
        { zone: "Zone 4 (milieu-gauche)", points: 4, direct: 2, faute: 1, maladresse: 1, chance: 0 },
        { zone: "Zone 5 (milieu-centre)", points: 4, direct: 3, faute: 1, maladresse: 0, chance: 0 },
        { zone: "Zone 6 (milieu-droite)", points: 2, direct: 1, faute: 1, maladresse: 0, chance: 0 }
      ],
      pointTypes: [
        { type: "Points directs", count: 10, percentage: 55.6 },
        { type: "Fautes provoquées", count: 5, percentage: 27.8 },
        { type: "Maladresses adverses", count: 2, percentage: 11.1 },
        { type: "Coups de chance", count: 1, percentage: 5.6 }
      ],
      strokes: [
        { type: "Amorti", count: 6, points: 4 },
        { type: "Smash", count: 15, points: 2 },
        { type: "Drive", count: 8, points: 4 },
        { type: "Dégagé", count: 6, points: 3 },
        { type: "Coup gagnant", count: 4, points: 2 },
        { type: "Autres", count: 10, points: 3 }
      ],
      badges: {
        bronze: 3,
        silver: 1,
        gold: 0,
        smash: 1
      }
    }
  };


  return Response.json(matchData);
}
