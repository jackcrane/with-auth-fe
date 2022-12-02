const Session = async ({ nonce }) => {
  if (!nonce) {
    return false;
  }
  const f = await fetch(`${process.env.API_ENDPOINT}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-nonce": nonce,
    },
  });
  const data = await f.json();
  return f.status === 200 && data.customer.id ? data.customer : false;
};

export default Session;
