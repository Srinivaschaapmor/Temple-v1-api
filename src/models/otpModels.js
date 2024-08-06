const otpStore = {};

export const saveOtp = async (phoneNumber, otp) => {
  otpStore[phoneNumber] = otp;
};

export const getOtp = async (phoneNumber) => {
  return otpStore[phoneNumber];
};

export const deleteOtp = async (phoneNumber) => {
  delete otpStore[phoneNumber];
};
