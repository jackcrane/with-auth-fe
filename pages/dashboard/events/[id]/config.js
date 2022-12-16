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

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await fetch(`/api/events/${id}/config`);
        const json = await res.json();
        setEvent(json);
        setOrigianlEvent(json);
        setLoading(false);
        setLoadedAt(moment().toISOString());
        setLoadedAtRelative(moment(loadedAt).fromNow());
      }
    })();
  }, [id, ticker]);

  useInterval(() => {
    setLoadedAtRelative(moment(loadedAt).fromNow());
  }, 5000);

  return (
    <>
      <ConfirmDrawer
        drawerOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        event={event}
        originalEvent={originalEvent}
        confirm={async (v) => {
          if (v === "UNIFYEM.EVENTS.RESET") {
            setEvent(originalEvent);
            setDrawerOpen(false);
          } else if (v === "UNIFYEM.EVENTS.SAVE") {
            setSaveUpdateLoading(true);
            setDrawerOpen(false);
            const res = await fetch(`/api/events/${id}/config`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                getObjectWithModifiedKeys(event, originalEvent)
              ),
            });
            console.log(res);
            if (!res.ok) {
              alert("Error saving event config");
              setSaveUpdateLoading(false);
              return;
            }
            setSaveUpdateLoading(false);
            setOrigianlEvent(event);
            setTicker(!ticker);
          }
        }}
      />
      <DashboardParent
        session={session}
        openkeys={["events", "current", id]}
        selectedkey="config"
        title="Config"
        breadcrumbs={
          <Breadcrumb>
            <Breadcrumb.Item>Events</Breadcrumb.Item>
            <Breadcrumb.Item>{id}</Breadcrumb.Item>
            <Breadcrumb.Item>Config</Breadcrumb.Item>
          </Breadcrumb>
        }
        headcrumbs={
          <Breadcrumb>
            <Breadcrumb.Item>
              Created{" "}
              {moment
                .utc(event.created_at)
                .local()
                .subtract(6, "hours")
                .fromNow()}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Modified{" "}
              {moment
                .utc(event.edited_at)
                .local()
                .subtract(6, "hours")
                .fromNow()}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Loaded {moment(loadedAt).fromNow()}
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" onClick={() => setTicker(!ticker)}>
              <ReloadOutlined />
              <span>Request fresh data</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        loading={loading}
      >
        <>
          {!objectEquals(event, originalEvent) && (
            <Alert message="You have unsaved changes" type="warning" showIcon />
          )}
          <>
            <Title level={2}>Event name</Title>
            <Text>
              This is the name of your event. It is the primary text used
              everywhere from headers to contact information to URLs. Be careful
              changing this value as it is a major change. We will attempt to
              redirect any links to the new name, but it is not guaranteed.
            </Text>
            <Input
              maxLength={254}
              placeholder="Event name"
              size="large"
              value={event.name}
              style={{ marginTop: 10 }}
              showCount
              onInput={(e) => {
                setEvent({ ...event, name: e.target.value });
              }}
            />
          </>
          <>
            <Title level={2}>Event description</Title>
            <Text>
              This is the description of your event. This is used in lots of
              things as well, but is far less mission critical than the name.
              Users will be able to see this description on the event page,
              emails, app stores, and more.
            </Text>
            <Input.TextArea
              maxLength={65000}
              placeholder="Event description"
              size="large"
              value={event.description}
              style={{ marginTop: 10 }}
              showCount
              onInput={(e) => {
                setEvent({ ...event, description: e.target.value });
              }}
            />
          </>
          <>
            <Title level={2}>Event URL</Title>
            <Text>
              This is the URL of your event\'s page. We use this anytime a user
              may want to visit your website or learn more about it. If you do
              not have a website, you can leave this blank or use our website
              builder service. If this is outlined in red, it means the URL is
              invalid. We still save it, but it may cause errors for your users.
            </Text>
            <Input
              maxLength={254}
              placeholder="Event URL"
              size="large"
              value={event.url}
              style={{ marginTop: 10 }}
              showCount
              type="url"
              status={verifyURL(event.url) ? "success" : "error"}
              onInput={(e) => {
                setEvent({ ...event, url: e.target.value });
              }}
            />
          </>
          <Tooltip
            title={
              objectEquals(event, originalEvent)
                ? "Nothing has changed"
                : "Click to save your work"
            }
          >
            <Button
              type={"primary"}
              style={{ marginTop: 10 }}
              disabled={objectEquals(event, originalEvent)}
              loading={saveUpdateLoading}
              onClick={() => setDrawerOpen(true)}
            >
              Save
            </Button>
          </Tooltip>
        </>
      </DashboardParent>
    </>
  );
};

export default Dashboard;
