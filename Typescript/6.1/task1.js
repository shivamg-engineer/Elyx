var fetchData = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Data fetched successfully");
        }, 2000);
    });
};
fetchData().then(function (data) { return console.log(data); });
