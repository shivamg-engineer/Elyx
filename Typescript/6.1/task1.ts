
export const fetchData = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const success = Math.random()>0.5;
            if(success){
                resolve("Data fetched successfully");
            }else{
                reject("Failed to fetch data");
            }
            
        }, 2000);
    });
};
// fetchData().then(data => console.log(data)).catch(error=> console.log(error));
