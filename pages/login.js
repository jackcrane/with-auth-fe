import Session from "../lib/session";

export const getServerSideProps = async (context) => {
  const cookienonce = context.req.cookies[`${process.env.NAMESPACE}.AuthNonce`];
  const session = await Session({ nonce: cookienonce });

  if (!Boolean(session)) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
};

import { useState } from "react";
import { Container, FieldZone } from "./Components";
import { Input, Space, Button, Alert } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const HandleLogin = async () => {
    setLoading(true);
    const res = await fetch("/api/login-proxy", {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    if (res.status === 302) {
      window.location.href = "/account";
    } else {
      const data = await res.json();
      if (res.status !== 200) {
        setError(data.error);
        setLoading(false);
        return;
      }
      window.location.href = "/account";
    }
  };

  return (
    <>
      <Container>
        <h1>Login</h1>
        <FieldZone>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {error && error !== "" && (
              <Alert
                message="Login error"
                showIcon
                description={error}
                type="error"
              />
            )}
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              size="large"
            />
            <Input.Password
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
            <Button
              type="primary"
              onClick={HandleLogin}
              loading={loading}
              disabled={loading}
              size="large"
            >
              Login
            </Button>
          </Space>
        </FieldZone>
      </Container>
    </>
  );
};

export default Login;
