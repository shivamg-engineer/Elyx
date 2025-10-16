// Challenge: Add support for a BankTransfer payment method.

interface CreditCardPayment {
  type: "credit";
  cardNumber: string;
}
interface PayPalPayment {
  type: "paypal";
  email: string;
}
//added bank-transfer
interface BankTransferPayment {
  type: "bank-transfer";
  bankAccountNumber: string;
  bankName: string;
}

type Payment = CreditCardPayment | PayPalPayment | BankTransferPayment;

function processPayment(payment: Payment) {
  if (payment.type === "credit") {
    console.log("Processing credit card payment for", payment.cardNumber);
  } else if(payment.type === "paypal"){
    console.log("Processing PayPal payment for", payment.email);
  }else{
console.log("Processing PayPal payment for",payment.bankName,"and",payment.bankAccountNumber);
  }
}


const bankPayment: BankTransferPayment = {
  type: "bank-transfer",
  bankAccountNumber: "987654321",
  bankName: "Big Bank"
};

processPayment(bankPayment);
// Output: Processing bank transfer payment for account 987654321 at Big Bank
