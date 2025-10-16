class User{
    constructor(name,email){
        this.email=email;
        this.name=name;
    }
}

class EmailService{
    sendEmail(user){
       console.log(`sending email to  ${user.email}`);
    }
}
const shreya=new User("Shreya","s@gmail.com");
console.log(shreya);

const radhe=new EmailService();
radhe.sendEmail(shreya);