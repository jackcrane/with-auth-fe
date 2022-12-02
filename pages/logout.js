import Session from "../lib/session";

export const getServerSideProps = async (context) => {
  const cookienonce = context.req.cookies[`${process.env.NAMESPACE}.AuthNonce`];
  const session = await Session({ nonce: cookienonce });

  if (!Boolean(session)) {
    context.res.setHeader(
      "Set-Cookie",
      `${process.env.NAMESPACE}.AuthNonce=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    );
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    await fetch(`${process.env.API_ENDPOINT}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-nonce": cookienonce,
      },
    });
    context.res.setHeader(
      "Set-Cookie",
      `${process.env.NAMESPACE}.AuthNonce=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    );
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

const Dashboard = ({ session }) => {
  return (
    <div>
      <main>
        <p>Logged in</p>
        {JSON.stringify(session)}
      </main>
    </div>
  );
};

export default Dashboard;
