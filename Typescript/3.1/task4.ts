type ApiResponse = 
{ success: boolean;
  data: object | null;
  message?: string;} 
  | { success: false; data: null; errorCode: number; message?: string }; 


const response: ApiResponse = {
  success: true,
  data: { id: 1, name: "John" },
};

console.log(response);

const failureResponse: ApiResponse={
    success:false,
    data:null,
    errorCode:404,
    message:"user not found"
    
}
console.log(failureResponse);