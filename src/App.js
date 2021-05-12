import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';

// Find all sets of 3 trinodes, check if each set has a solution, and add all solutions to a list
function checkNodes(trinodes) {
  let solutionNodes = [];

  if (trinodes.length < 3) {
    return solutionNodes;
  }
  for (let firstNodeIndex = 0; firstNodeIndex < trinodes.length; firstNodeIndex++) {
    for (let secondNodeIndex = 1; secondNodeIndex < trinodes.length; secondNodeIndex++) {
      for (let thirdNodeIndex = 2; thirdNodeIndex < trinodes.length; thirdNodeIndex++) {
        // Pick out three trinodes to consider
        let currentTrinodes = [trinodes[firstNodeIndex], trinodes[secondNodeIndex], trinodes[thirdNodeIndex]];
        // Keep track of the three skills appearing in the first slot
        let firstSkills = [currentTrinodes[0][0], currentTrinodes[1][0], currentTrinodes[2][0]];
        // Array for counting number of occurrences of each skill
        let skillCounts = [0, 0, 0, 0, 0, 0];
        // First, check that all first skills are unique
        if (firstSkills[0] != firstSkills[1] && 
            firstSkills[0] != firstSkills[2] && 
            firstSkills[1] != firstSkills[2]) {
          // Count how many of each skill there are total
          currentTrinodes.forEach(trinode => 
            trinode.forEach(skill => 
                skillCounts[skill - 1]++
          ));
          // Make sure that the number of occurrences of every skill is either 1 or 2
          // If this is the case, there will be three that occur once and three that occur twice
          if (skillCounts.every(count => count == 1 || count == 2)) {
            let validSkills = [];
            for (let i = 0; i < skillCounts.length; i++) {
              if (skillCounts[i] == 1) {
                // For the three skills that occur once, add their index to the list of valid skills
                validSkills.push(i + 1);
              }
            }
            // Sanity check
            if (validSkills.length != 3) {
              throw "Valid skills length is not 3";
            }
            // Check each permutation of validSkills, adding to solutionNodes if the permutation works
            permuteArray(validSkills).forEach(permutation => {
              // If the first skill in the permutation is unique, the trinode is a solution
              if (firstSkills.every(skill => skill != permutation[0])) {
                // Filter out duplicates
                if (!solutionNodes.some(node => node[0] == permutation[0] && node[1] == permutation[1] && node[2] == permutation[2])) {
                  solutionNodes.push(permutation);
                }
              }
            });
          }
        }
      }
    }
  }
  return solutionNodes;
}

// Returns every permutation of the input array
function permuteArray(input) {
  let res = [];

  if (input.length == 0) {
    return [];
  } else if (input.length == 1) {
    return input;
  } else {
    for (let i = 0; i < input.length; i++) {
      const current = input[i];
      const remainder = input.slice(0, i).concat(input.slice(i + 1));
      const permutedRemainder = permuteArray(remainder);

      for (let j = 0; j < permutedRemainder.length; j++) {
        const permutedArray = [current].concat(permutedRemainder[j]);
        res.push(permutedArray);
      }
    }
  }
  return res;
}

const App = () => {

  const trinodes = [[1,3,5], [6,3,5], [4,1,2], [5,1,4], [2,5,3], [1,2,3], [1,6,3]];

  const trinodeList = checkNodes(trinodes).map((trinode) =>
    <li>{trinode}</li>
  );

  return (
    <div>
      <header>
        <ul>{trinodeList}</ul>
      </header>
    </div>
  );
}

export default App;
