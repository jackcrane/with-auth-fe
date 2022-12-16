import { Row, CenteredRow, Main, Header, Body } from "#components/Components";
import { Typography } from "antd";
const { Title } = Typography;
import Nav from "#components/Nav";

const DashboardParent = ({
  session,
  openkeys,
  selectedkey,
  title,
  breadcrumbs,
  children,
  headcrumbs,
  loading,
}) => {
  return (
    <div>
      <Row gap={"20px"} height={"100%"} minHeight={"100vh"}>
        <Nav session={session} openkeys={openkeys} selectedkey={selectedkey} />
        <Main>
          <Header>
            <CenteredRow gap={"20px"}>
              <img src="/logotype.svg" alt="logotype" style={{ height: 50 }} />
              <Title style={{ margin: 0 }}>{title}</Title>
            </CenteredRow>
            {breadcrumbs}
          </Header>
          {!loading ? (
            <>
              {headcrumbs}
              <Body>{children}</Body>
            </>
          ) : (
            <Body>
              <title title={2}>Loading...</title>
            </Body>
          )}
        </Main>
      </Row>
    </div>
  );
};

export { DashboardParent };
