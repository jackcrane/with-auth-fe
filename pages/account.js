import Session from "../lib/session";

export const getServerSideProps = async (context) => {
  const cookienonce = context.req.cookies[`${process.env.NAMESPACE}.AuthNonce`];
  const session = await Session({ nonce: cookienonce });

  if (!Boolean(session)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        session,
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
