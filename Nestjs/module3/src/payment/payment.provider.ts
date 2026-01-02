export const PAYMENT_TOKEN='PAYMENT_TOKEN';

export const PaymentProvider={
    provide:PAYMENT_TOKEN,
    useValue:{
        pay(amount:number){
            return`Paid $${amount} successfully.`;
        },
    },
};