const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "admin@codeial.com",
      to: comment.user.email,
      subject: "New comment posted",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail...", err);
        return;
      }
      console.log("Notification sent!");
      return;
    }
  );
};
