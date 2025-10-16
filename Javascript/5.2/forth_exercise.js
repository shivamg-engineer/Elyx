// Exercise 4: Leaderboard Sorting

// Create an array of objects representing players with name and score.
// Sort the leaderboard in descending order.
// Print the top 3 players.

const arr=[
    {
        name:"Sandeep",
        score:77
    },
    {
        name:"shivam",
        score:88
    },
    {
        name:"Maiwish",
        score:0
    }

];

arr.sort((a,b)=>b.score-a.score);
console.log(arr);   