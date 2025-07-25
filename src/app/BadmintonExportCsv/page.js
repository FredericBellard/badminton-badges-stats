"use client"
import { useState } from 'react';

function BadmintonExportCsv({matchData}) {
    const formatDataCSV = (matchData) => {
        return Object.values(matchData).map(joueur => ({
            Nom: joueur.name,
            Points_Totaux: joueur.totalPoints,
            Points_par_zone: joueur.pointsByZone.map(zon => `${zon.zone}: ${zon.points}`).join(' | '),
            Types_de_points: joueur.pointTypes.map(poi => `${poi.type}: ${poi.count} (${poi.percentage}%)`).join(' | '),
            Coups: joueur.strokes.map(str => `${str.type}: ${str.count} (${str.points}pts)`).join(' | '),
            Badges: Object.entries(joueur.badges).map(([key, value]) => `${key}: ${value}`).join(', ')
        }));
    };

    const [data] = useState(formatDataCSV(matchData));

    const convertInCSV = (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) return '';

        const headers = Object.keys(data[0]).join(',');
        const lines = data.map(line =>
            Object.values(line).map(val => `"${val}"`).join(',')
        );
        return [headers, ...lines].join('\n');
        };

    const downloadCSV = (data, fileName = 'statistiques_match_badminton.csv') => {
        const csv = convertInCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        };

  return (
    <div>
      <h2>📊 Exporter les statistiques du match de badminton</h2>
      <button
        onClick={() => downloadCSV(data)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        aria-label="Télécharger les statistiques du match au format CSV"
      >
        ⬇️ Télécharger CSV
      </button>
    </div>
  );
};

export default BadmintonExportCsv;
