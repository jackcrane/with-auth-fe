import { Button, Drawer, Space, Collapse, Divider, Typography } from "antd";
const { Title, Text } = Typography;
import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { getDifferentKeys } from "../lib/getDifferentKeys";
import { getAddedAndRemovedCharacters } from "../lib/getAddedAndRemovedCharacters";

export const ConfirmDrawer = ({
  drawerOpen,
  onClose,
  confirm,
  event,
  originalEvent,
}) => {
  const [innerDrawerOpen, setInnerDrawerOpen] = useState(false);

  return (
    <Drawer
      open={drawerOpen}
      onClose={() => {
        onClose(false);
      }}
      title="Save changes"
    >
      <>
        <Drawer
          title="Confirm reset"
          open={innerDrawerOpen}
          onClose={() => setInnerDrawerOpen(false)}
        >
          <Space direction="vertical">
            <Text>
              Are you sure you want to reset this event? This will delete all
              unsaved changes and reset the event to the state currently in
              production.
            </Text>
            <Button
              danger
              type="primary"
              onClick={() => {
                setInnerDrawerOpen(false);
                confirm("UNIFYEM.EVENTS.RESET");
              }}
            >
              Okay, reset
            </Button>
          </Space>
        </Drawer>
        <Space direction="vertical">
          <Text>
            Here is exactly what will change in your configuration. We suggest
            you look over it and verify nothing will change that isn\'t supposed
            to.
          </Text>
          <Collapse>
            {getDifferentKeys(event, originalEvent).map((item, i) => (
              <Collapse.Panel
                header={item}
                key={i}
                extra={
                  <>
                    <Text keyboard type="danger">
                      -
                      {
                        getAddedAndRemovedCharacters(
                          originalEvent[item],
                          event[item]
                        ).removed.length
                      }
                    </Text>
                    <Text keyboard type="success">
                      -
                      {
                        getAddedAndRemovedCharacters(
                          originalEvent[item],
                          event[item]
                        ).added.length
                      }
                    </Text>
                  </>
                }
              >
                <ReactDiffViewer
                  oldValue={originalEvent[item] || ""}
                  newValue={event[item] || ""}
                  splitView={false}
                  hideLineNumbers={true}
                  styles={{
                    wordDiff: {
                      padding: 0,
                    },
                  }}
                />
              </Collapse.Panel>
            ))}
          </Collapse>
          <Space>
            <Button
              type="primary"
              onClick={() => confirm("UNIFYEM.EVENTS.SAVE")}
            >
              Save
            </Button>
            <Button
              type="default"
              danger
              onClick={() => setInnerDrawerOpen(true)}
            >
              Cancel & reset
            </Button>
          </Space>
          <Divider />
          <Text>
            We show differences using a \"diff\" UI. This will be familiar to
            programmers and those familiar with tech; but reading them is
            simple: The faint red background is the old content, and the faint
            green background is the new content. Bright red text is content that
            has been removed, and bright green text is content that has been
            added. Below is an example.
          </Text>
          <ReactDiffViewer
            oldValue="This is the old content"
            newValue="This is the new content"
            splitView={false}
            hideLineNumbers={true}
            styles={{
              wordDiff: {
                padding: 0,
              },
            }}
          />
          <Text>
            If you are making large changes to the event, you can ignore the
            diff output, it can be buggy finding differences when dealing with
            large strings of text because there are so many characters to
            compare. This feature is included to help you identify potential
            typos and accidental changes.
          </Text>
          <ReactDiffViewer
            oldValue="When dealing with longer strings and content, the diff viewer can be buggy."
            newValue="When completely changing your content, it is safe to ignore the diff because the format is weird"
            splitView={false}
            hideLineNumbers={true}
            styles={{
              wordDiff: {
                padding: 0,
              },
            }}
          />
        </Space>
      </>
    </Drawer>
  );
};
