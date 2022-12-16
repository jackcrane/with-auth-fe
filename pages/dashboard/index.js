import Session from "../../lib/session";

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

import Nav from "../../components/Nav";
import { Row, Main, Spaced, BigButton } from "../../components/Components";
import { Alert } from "antd";

const STATUS_MAP = {
  "UnifyEM.AWAITINGPAYMENTINFO": {
    text: "Awaiting payment information. This is not urgent, but you will not be able to publish events until you provide payment information.",
    link: "/dashboard/settings/payment",
  },
  "UnifyEM.AWAITINGEMAILCONFIRMATION": {
    text: "Awaiting email confirmation. Please check your email for a confirmation link. Otherwise reach out to support",
  },
  "UnifyEM.AWAITINGPHONECONFIRMATION": {
    text: "Awaiting phone confirmation. Please check your phone for a PIN. Otherwise reach out to support",
  },
};

const Dashboard = ({ session }) => {
  return (
    <div>
      <Row gap={"20px"} height={"100%"} minHeight={"100vh"}>
        <Nav session={session} selectedkey="home" />
        <Main>
          <img src="/logotype.svg" alt="logotype" style={{ height: 50 }} />
          <p>Logged in</p>
          <p>Welcome to UnifyEM! We are glad to have you here!</p>
          <Spaced>
            {session.status.length > 0 &&
              session.status.map((status, i) => (
                <Alert
                  message={STATUS_MAP[status].text}
                  key={i}
                  type="warning"
                  showIcon
                />
              ))}
          </Spaced>
          <BigButton href="/dashboard/events">Events</BigButton>
        </Main>
      </Row>
    </div>
  );
};

export default Dashboard;
