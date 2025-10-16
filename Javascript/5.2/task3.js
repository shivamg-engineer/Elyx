let leaderboard = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 80 },
    { name: "Charlie", score: 85 }
];


leaderboard.sort((a, b) => b.score - a.score);

console.log(leaderboard);

