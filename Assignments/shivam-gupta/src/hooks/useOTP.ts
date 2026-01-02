import { useEffect, useState } from "react";

export function useOTP(length: number = 6, expirySeconds: number = 30) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(expirySeconds);
  const [canResend, setCanResend] = useState(false);

  // Generate random OTP
  const generateOtp = () => {
    const newOTP = Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    )
      .toString()
      .padStart(length, "0");

    setGeneratedOtp(newOTP);
    alert("OTP SENT →"+newOTP);
    console.log("OTP SENT →", newOTP);

    setOtp(Array(length).fill(""));
    setTimer(expirySeconds);
    setCanResend(false);

    return newOTP;
  };

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const t = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(t);
    }

    setCanResend(true);
  }, [timer]);

  // Handle typing in OTP boxes
  const handleOtpChange = (
    value: string,
    index: number,
    onVerify: (success: boolean) => void
  ) => {
    if (!/^\d?$/.test(value)) return;

    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    // Auto-focus next box
    if (value && index < length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }

    // Check if all filled
    const fullOtp = copy.join("");
    if (copy.every((d) => d !== "")) {
      const success = fullOtp === generatedOtp;
      onVerify(success);

      if (!success) {
        // Reset OTP
        setOtp(Array(length).fill(""));
        const first = document.getElementById("otp-0");
        first?.focus();
      }
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const resendOtp = () => {
    console.log("OTP RESENT →", generateOtp());
  };

  return {
    otp,
    generatedOtp,
    timer,
    canResend,
    generateOtp,
    handleOtpChange,
    handleBackspace,
    resendOtp,
  };
}
