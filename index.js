var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var cors = require("cors");

// Transporter Setup
// -------------------------------------------------------
let transport = {
  host: process.env.MAILSERVER_HOST,
  port: 587,
  auth: {
    user: process.env.MAILSERVER_USERNAME,
    pass: process.env.MAILSERVER_PSW,
  },
};

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// Email Validation
// -------------------------------------------------------
function checkRequest(requestObject) {
  const { name, email, company, message } = requestObject;
  if (name == null || email == null || company == null || message == null) {
    return {
      status: 422,
      message:
        (name == null ? "Name cannot be empty.\n" : "") +
        (email == null ? "Email cannot be empty.\n" : "") +
        (company == null ? "Company cannot be empty.\n" : "") +
        (message == null ? "Message cannot be empty." : ""),
    };
  } else if (name === "" || email === "" || company === "" || message === "") {
    return {
      status: 422,
      message:
        (name === "" ? "Name cannot be empty.\n" : "") +
        (email === "" ? "Email cannot be empty.\n" : "") +
        (company === "" ? "Company cannot be empty.\n" : "") +
        (message === "" ? "Message cannot be empty." : ""),
    };
  } else {
    return {
      status: 200,
      message: "Valid request",
    };
  }
}

// Email Composition
// -------------------------------------------------------
function composeMail(requestObject) {
  const { name, email, company, message } = requestObject;

  let sender = {
    name: name,
    address: email,
  };

  let content = `
      <div class="navbar" style="width: calc(100% - 2em); display: flex; align-items: center; justify-content: flex-start; background-color: #4f596d; padding: 13px;">
          <p style="color: #ededed; margin: 0 13px 0 0;"><b>From:</b> ${sender.name}</p>
          <p style="color: #ededed; margin: 0 0 0 21px;"><b>Company:</b> ${company}</p>
      </div>
      <div style="padding: 13px;">
        ${message}
      </div>`;

  let mail = {
    from: sender,
    to: process.env.MAILSERVER_DESTINATIONEMAIL,
    subject: `👨‍💻 JOB Contact: ${company}`, // Don't forget to change your subject.
    html: content,
  };

  return mail;
}

// Creating route to send the email if valid
// -------------------------------------------------------
router.post("/send", (req, res, next) => {
  checker = checkRequest(req.body);
  isInvalid = checker.status != 200;
  emailToSend = composeMail(req.body);

  console.log(emailToSend.sender, emailToSend.message);

  transporter.sendMail(emailToSend, (err, data) => {
    if (err || isInvalid) {
      res.json({
        status: checker.status,
        message: checker.message,
      });
    } else {
      res.json({
        status: checker.status,
        message: checker.message,
      });
    }
  });
});

// Server and Middleware Setup
// -------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(3002);
