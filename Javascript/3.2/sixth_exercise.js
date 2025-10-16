const words = ["apple", "banana", "strawberry", "kiwi"];

const max= words.reduce((currWord,longestWord)=>{
    return  currWord.length>longestWord.length ? currWord:longestWord;
});

console.log(max);
