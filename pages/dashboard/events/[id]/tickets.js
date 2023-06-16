import { SessionManager } from "#lib/session";

export const getServerSideProps = async (context) =>
  await SessionManager(context);

import { useRouter } from "next/router";
import { Alert, Breadcrumb, Button, Input, Typography, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import { useEffect, useState } from "react";
import { objectEquals } from "#lib/objectEquals";
import { getObjectWithModifiedKeys } from "#lib/getObjectWithModifiedKeys";
import { ConfirmDrawer } from "#components/ConfirmDrawer";
import moment from "moment";
import { verifyURL } from "#lib/verifyURL";
import { useInterval } from "#hooks/useInterval";
import { DashboardParent } from "#components/DashboardParent";

const Dashboard = ({ session }) => {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState({});
  const [originalEvent, setOrigianlEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveUpdateLoading, setSaveUpdateLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loadedAt, setLoadedAt] = useState(moment().toISOString());
  const [loadedAtRelative, setLoadedAtRelative] = useState("");

  const [ticker, setTicker] = useState(false);

  return (
    <>
      <DashboardParent
        session={session}
        openkeys={["events", "current", id]}
        selectedkey="tickets"
        title="Config"
        breadcrumbs={
          <Breadcrumb>
            <Breadcrumb.Item>Events</Breadcrumb.Item>
            <Breadcrumb.Item>{id}</Breadcrumb.Item>
            <Breadcrumb.Item>Config</Breadcrumb.Item>
          </Breadcrumb>
        }
        headcrumbs={<></>}
        loading={loading}
      >
        <></>
      </DashboardParent>
    </>
  );
};

export default Dashboard;
