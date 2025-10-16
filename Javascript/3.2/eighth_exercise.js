// 8. Count Occurrences of Words Using reduce()
// Given an array of words, use reduce() to count how many times each word appears.

    const words = ["apple", "banana", "apple", "orange", "banana", "apple"];

    const count =words.reduce((count,fruit)=>{
        count[fruit]= (count[fruit]|| 0)+1;
        return count;
    },{});
    console.log(count);