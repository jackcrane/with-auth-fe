// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const nonce = req.cookies[`${process.env.NAMESPACE}.AuthNonce`];
  console.log("nonce", nonce);
  console.log(`${process.env.NAMESPACE}.AuthNonce`);
  console.log(req.cookies);
  console.log(req.method);
  console.log(req.body);

  const f = await fetch(`http://localhost:4000/events/${req.query.id}/config`, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "x-auth-nonce": nonce,
    },
    body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
  });

  const data = await f.json();

  console.log(f.status, data);

  res.status(f.status).send(data);
}
