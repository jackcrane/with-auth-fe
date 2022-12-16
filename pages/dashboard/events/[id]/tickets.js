import Session from "../../../../lib/session";

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

import Nav from "../../../../components/Nav";
import { Row, Main } from "../../../../components/Components";
import { useRouter } from "next/router";

const Dashboard = ({ session }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Row gap={"20px"} height={"100%"} minHeight={"100vh"}>
        <Nav
          session={session}
          openkeys={["events", "current", id]}
          selectedkey="tickets"
        />
        <Main>
          <img src="/logotype.svg" alt="logotype" style={{ height: 50 }} />
          <p>Logged in</p>
          {JSON.stringify(session)}
        </Main>
      </Row>
    </div>
  );
};

export default Dashboard;
