import React, { useState } from "react";
import { Button, Drawer, Textarea } from "@mantine/core";

const ChatBot: React.FC = () => {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="ChatBot"
                padding="md"
                position="right"
                size="md"
            >
                <Textarea
                    placeholder="Ask me anything..."
                    minRows={6}
                    autosize
                    styles={{
                        input: {
                            fontSize: "16px",
                            lineHeight: 1.5,
                        },
                    }}
                />
            </Drawer>
            <Button
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                }}
                onClick={() => setOpened(true)}
            >
                Chat with us
            </Button>
        </>
    );
};

export default ChatBot;
