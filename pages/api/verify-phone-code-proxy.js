// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const f = await fetch(`${process.env.API_ENDPOINT}/verify/phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pin: req.body.pin,
    }),
  });

  const data = await f.json();

  res.status(f.status).send(data);
}
