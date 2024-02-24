const { sendMail } = require("../config/mailer");
const handlebars = require("handlebars");
const { FRONTEND_URI, ADMIN_MAIL } = process.env;
const fs = require("fs");
const path = require("path");

// to both
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

// to User
const infowarrantyMail = (data) => {
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

// to User
const infostudioMail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const source = fs
        .readFileSync(
          path.resolve(__dirname, "../views/mails/studioactions.hbs"),
          "utf-8"
        )
        .toString();

      const template = handlebars.compile(source);

      const replacements = {
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
        approvelink: data?.approvelink,
        denylink: data?.denylink,
      };

      const htmltoSend = template(replacements);

      const info = {
        to: ADMIN_MAIL,
        subject: "New Studio Registration",
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

//to Admin then User for New Registration Info
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

//to Admin then User for New Registration Info
const approveStudioMail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const source = fs
        .readFileSync(
          path.resolve(__dirname, "../views/mails/studioactions.hbs"),
          "utf-8"
        )
        .toString();

      const template = handlebars.compile(source);

      const replacements = {
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
        approvelink: data?.approvelink,
        denylink: data?.denylink,
      };

      const htmltoSend = template(replacements);

      const info = {
        to: ADMIN_MAIL,
        subject: "New Studio Registration",
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

// to User
const succeesStudioMail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const source = fs
        .readFileSync(
          path.resolve(__dirname, "../views/mails/studioactions.hbs"),
          "utf-8"
        )
        .toString();

      const template = handlebars.compile(source);

      const replacements = {
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
        approvelink: data?.approvelink,
        denylink: data?.denylink,
      };

      const htmltoSend = template(replacements);

      const info = {
        to: ADMIN_MAIL,
        subject: "New Studio Registration",
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

// to User
const succeesWarrantyMail = (data) => {
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

// to User
const deleteWarrantyMail = (data) => {
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

// to User
const deleteStudioMail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const source = fs
        .readFileSync(
          path.resolve(__dirname, "../views/mails/deleteStudio.hbs"),
          "utf-8"
        )
        .toString();

      const template = handlebars.compile(source);

      const replacements = {
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
      };

      const htmltoSend = template(replacements);

      const info = {
        to: data?.email,
        subject: "Studio Cancellation",
        text: data?.email,
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
  approveStudioMail,
  succeesStudioMail,
  succeesWarrantyMail,
  deleteWarrantyMail,
  deleteStudioMail,
};
