import { useEffect, useState } from "react";
import { Steps, Typography, Button, Input, Space, Alert } from "antd";
import { FieldZone, Container } from "#components/Components";
const { Title, Paragraph } = Typography;

const Signup = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(null);
  const _setName = (e) => {
    setName(e.target.value);
  };

  const [phone, setPhone] = useState("");
  const [phoneNumValid, setPhoneNumValid] = useState(null);
  const _setPhone = (e) => {
    setPhone(e.target.value);
  };

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const _setEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const _setPassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (name === "") {
      setNameValid("empty");
    } else if (name.length < 3) {
      setNameValid("error");
    } else {
      setNameValid("success");
    }
  }, [name]);

  useEffect(() => {
    if (phone === "") {
      setPhoneNumValid("empty");
    } else if (phone.length < 10) {
      setPhoneNumValid("error");
    } else {
      setPhoneNumValid("success");
    }
  }, [phone]);

  const isEmailValid = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (email === "") {
      setEmailValid("empty");
    } else if (isEmailValid(email)) {
      setEmailValid("success");
    } else {
      setEmailValid("error");
    }
  }, [email]);

  useEffect(() => {
    if (password === "") {
      setPasswordValid("empty");
    } else if (password.length < 8) {
      setPasswordValid("error");
    } else {
      setPasswordValid("success");
    }
  }, [password]);

  useEffect(() => {
    (async () => {
      if (currentStep === 0) {
        document.title = "Sign up";
      } else if (currentStep === 1) {
        document.title = "Sign up - Step 2";
      } else if (currentStep === 2) {
        document.title = "Sign up - Step 3";
        await requestSignup();
      }
    })();
  }, [currentStep]);

  const [error, setError] = useState("");

  const requestSignup = async () => {
    try {
      const signup_res = await fetch("/api/signup-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNum: phone,
          password,
        }),
      });
      console.log(signup_res);
      if (signup_res.status !== 200) {
        try {
          let signup_data = await signup_res.json();
          setError(signup_data.error);
        } catch (error) {
          setError("Something went wrong");
        }
        setCurrentStep(1);
        return;
      } else {
        const signup_data = await signup_res.json();
        console.log("success");
        console.log(signup_data);
        console.log(signup_res);
        console.log("cs", currentStep);
        setCurrentStep(2);
      }
    } catch (error) {
      setError(
        "Something went wrong. Inform support that error '876b665e-48fa-46fd-bf38-16929a926420' occurred"
      );
    }
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Steps
        current={currentStep}
        items={[
          {
            title: "Start",
          },
          {
            title: "Your information",
          },
          {
            title: "Verification",
          },
          {
            title: "Done",
          },
        ]}
      />
      <FieldZone>
        {currentStep === 0 && (
          <>
            <Title level={2}>Start</Title>
            <Paragraph>Create an account</Paragraph>
            <Button
              type="primary"
              size={"large"}
              onClick={() => setCurrentStep(1)}
            >
              Lets go!
            </Button>
          </>
        )}
        {currentStep === 1 && (
          <>
            <Title level={2}>Your information</Title>
            <Paragraph>Please fill in your information</Paragraph>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              {error && error !== "" && (
                <Alert
                  message="Signup error"
                  showIcon
                  description={error}
                  type="error"
                />
              )}
              <Input
                type="text"
                placeholder="Name"
                addonBefore="Your name"
                status={nameValid}
                value={name}
                onInput={_setName}
              />
              <Input
                type="text"
                placeholder="Email"
                addonBefore="Your email"
                status={emailValid}
                value={email}
                onInput={_setEmail}
              />
              <Input
                type="number"
                placeholder="Phone"
                addonBefore="Your phone number"
                status={phoneNumValid}
                value={phone}
                onInput={_setPhone}
              />
              <Input.Password
                type="password"
                placeholder="8 character password"
                addonBefore="Your password"
                status={passwordValid}
                onInput={_setPassword}
                value={password}
                minLength={8}
                showCount={true}
              />
              <Space
                direction="horizontal"
                size="middle"
                style={{ display: "flex" }}
              >
                <Button
                  type="dashed"
                  size={"large"}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  size={"large"}
                  disabled={
                    nameValid === "success" &&
                    emailValid === "success" &&
                    phoneNumValid === "success" &&
                    passwordValid === "success"
                      ? false
                      : true
                  }
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              </Space>
            </Space>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Title level={2}>Verify</Title>
            <Paragraph>
              We texted you a 6-digit PIN. Please enter it below:
            </Paragraph>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Input
                type="number"
                placeholder="6 digit PIN"
                addonBefore="PIN"
                size="large"
              />
              <Space
                direction="horizontal"
                size="middle"
                style={{ display: "flex" }}
              >
                <Button
                  type="dashed"
                  size={"large"}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  size={"large"}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              </Space>
            </Space>
          </>
        )}
        {currentStep === 3 && (
          <>
            <Title level={2}>Done</Title>
            <Paragraph>Thank you for signing up!</Paragraph>
            <a href="/login">Login</a>
          </>
        )}
      </FieldZone>
    </Container>
  );
};

export default Signup;
