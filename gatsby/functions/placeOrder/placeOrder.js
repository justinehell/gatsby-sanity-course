const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li><img src="${item.thumbnail}" alt="${item.name}" />
        ${item.size} ${item.name} - ${item.price}
        </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none,
        }
    </style>
  </div>`;
}

// create a transport for nodemailer --> for development env we use ethereal.email to generate fake mail
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // console.log(event.body); prints the event.body as a string -> We need to parse it to have it as an object
  const body = JSON.parse(event.body);
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  // We need to loop over the array but using a forEach will create another function scope
  // and we can't return from a inner scope of an outer scope - so we use "for ... of array")
  for (const field of requiredFields) {
    console.log(`checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New order !',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success! ' }),
  };
};
