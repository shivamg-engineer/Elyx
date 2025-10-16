    type User={
        readonly id:number;
        name:string;
        age?:number;
    };

    const User: User={id:1,name:"Sandy"};
    console.log(User);

    // user.id = 2;// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property