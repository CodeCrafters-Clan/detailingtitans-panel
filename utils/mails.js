const express = require("express");
const { sendMail } = require("../config/mailer");
const handlebars = require("handlebars");
const { FRONTEND_URI, ADMIN_MAIL } = process.env;
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

const approveWarrantyMail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const source = fs
        .readFileSync(
          path.resolve(__dirname, "../views/mails/warrantyactions.hbs"),
          "utf-8"
        )
        .toString();

      const template = handlebars.compile(source);

      const replacements = {
        key: data?.productkey,
        tenure: data?.tenure,
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
        approvelink: data?.approvelink,
        denylink: data?.denylink,
      };

      const htmltoSend = template(replacements);

      const info = {
        to: ADMIN_MAIL,
        subject: "New Warranty Registration",
        text: data?.approvelink,
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
  approveWarrantyMail,
};
