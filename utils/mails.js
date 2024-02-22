const express = require("express");
const { sendMail } = require("../config/mailer");
const handlebars = require("handlebars");
const { FRONTEND_URI } = process.env;
const fs = require("fs");
const path = require("path");

const forgotpasswordMail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const source = fs
        .readFileSync(
          path.resolve(__dirname, "../views/mails/forgotpassword.hbs"),
          "utf-8"
        )
        .toString();

      const template = handlebars.compile(source);

      const replacements = {
        link: data?.reset,
        username: data?.username,
      };

      const htmltoSend = template(replacements);

      const info = {
        to: data?.email,
        subject: "Reset Password",
        text: data?.reset,
        html: htmltoSend,
      };

      sendMail(info)
        .then(() => resolve(true))
        .catch((error) => reject(false));
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};

module.exports = {
  forgotpasswordMail,
};
