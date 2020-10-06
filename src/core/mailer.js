import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "dozideniss@gmail.com",
    pass: "Wolf5den",
  },
});

export default transporter;
