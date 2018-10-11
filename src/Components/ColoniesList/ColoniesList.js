import React from 'react';
import { groupByEveryN } from 'AppUtils';
import { Colony } from './Colony';
import './styles.css';

const groupByEvery5 = groupByEveryN(5);

export function ColoniesList({ colonies, postColonies, onTouchColony }) {
  const fullColonies = [...colonies];
  fullColonies.sort(function(a,b) {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  while (fullColonies.length % 5 !== 0) {
    fullColonies.push({
      isEmpty: true,
      uuid: `emptyColony#${fullColonies.length}`
    });
  }

  const groupedColonies = groupByEvery5(fullColonies);
  return groupedColonies.map((colonyRowArray, index) => (
      <div id='colony-row' key={index}>
        {colonyRowArray.map(colony => (
          <Colony
            data={colony}
            key={colony.uuid}
            postColonies={postColonies}
            onTouchColony={onTouchColony}
          />
        ))}
      </div>
  ))
}
