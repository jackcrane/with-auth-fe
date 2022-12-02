// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(req.cookies.nonce);

  const f = await fetch("http://localhost:4000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      nonce: req.cookies.nonce,
      "passed-user-agent": req.headers["user-agent"],
    },
    body: JSON.stringify({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phoneNum,
      password: req.body.password,
    }),
  });

  const data = await f.json();

  console.log(f.status, data);

  res.status(f.status).send(data);
}
