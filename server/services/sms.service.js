// require("dotenv").config();
// const accountSid = process.env.SMS_ACCOUNT_SID;
// const authToken = process.env.SMS_AUTH_TOKEN;
// // const verifySid = process.env.SMS_VERIFY_SID;
// const twilio = require("twilio")(accountSid, authToken);

// const number = "+12294045503";

// exports.smsSend = async (to, text) => {
//   return await twilio.messages
//     .create({
//       from: number,
//       to: to,
//       body: text,
//     })
//     .then((res) => {
//       console.log("message has sent!");
//       console.log("res:", res);
//       return { status: true, message: "message has sent!" };
//     })
//     .catch((err) => {
//       console.log(err);
//       return { status: false, message: "Could not be sent!" };
//     });
// };
