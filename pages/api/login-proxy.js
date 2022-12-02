// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  console.log(req.cookies.nonce);

  const f = await fetch(`${process.env.API_ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: req.body.email,
      password: req.body.password,
    }),
  });

  const data = await f.json();

  console.log(f.status, data);

  if (f.status === 200) {
    // set HTTPOnly cookie to data.nonce
    res.setHeader("Set-Cookie", [
      `${process.env.NAMESPACE}.AuthNonce=${data.nonce}; HttpOnly; Path=/`,
    ]);
    // redirect
    // res.redirect(302, "/account");
    res.status(302).json({});
  } else {
    res.status(401).json(data);
  }
}
