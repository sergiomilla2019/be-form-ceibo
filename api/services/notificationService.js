const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const html = require("../utils/mail");
const User = require("../models/User");

const SUBJECT = "Webinar de Hyperpersonalization";

class NotificationService {
  static async serviceNotificationUser(req) {
    try {
      let email = req.body.mail;
      let name = `${req.body.firstName} ${req.body.lastName}`;
      sgMail.setApiKey(process.env.SENDGRID_KEY);
      const msg = {
        from: "marketing@ceibo.digital",
        to: email,
        subject: SUBJECT,
        html: html(email, name),
      };
      sgMail
        .send(msg)
        .then((response) => {
          console.log("Status Code->", response[0].statusCode);
          console.log("Headers->", response[0].headers);
        })
        .catch((error) => {
          console.error("error", error.response);
        });
      return { exist: req.body };
    } catch (err) {
      console.error(err);
    }
  }

  static async serviceNotificationAllUsers(req) {
    try {
      const allUsers = await User.find({});
      for (const item in allUsers) {
        let email = allUsers[item].mail;
        let name = `${allUsers[item].firstName} ${allUsers[item].lastName}`;

        sgMail.setApiKey(process.env.SENDGRID_KEY);
        const msg = {
          from: "marketing@ceibo.digital",
          to: allUsers[item].mail,
          subject: `¡Es hoy! Te compartimos el link de acceso al ${SUBJECT}`,
          html: html(email, name),
        };
        sgMail
          .send(msg)
          .then((response) => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
          })
          .catch((error) => {
            console.error("error", error.response);
          });
      }

      return { exist: req.body };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = NotificationService;