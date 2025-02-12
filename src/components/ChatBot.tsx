import React, { useState } from "react";
import { Button, Drawer, Textarea, Stack, Text, ScrollArea, Loader } from "@mantine/core";
import { useChatBotResponse } from "../api/serviice"; // Use the new hook

const ChatBot: React.FC = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<{ sender: "user" | "bot"; content: string }[]>([]);

    const { data: botResponse, refetch, isFetching } = useChatBotResponse("", { enabled: false });

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", content: input };
        setMessages((prev) => [...prev, userMessage]); // Add user's message to the chat
        setInput("");

        // Fetch chatbot response
        const response = await refetch({ queryKey: ["chatbotResponse", input] });
        if (response.data) {
            setMessages((prev) => [...prev, { sender: "bot", content: response.data }]);
        } else {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", content: "Oops! Something went wrong. Please try again." },
            ]);
        }
    };

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
                <ScrollArea style={{ height: "400px" }}>
                    <Stack spacing="xs">
                        {messages.map((msg, index) => (
                            <Text
                                key={index}
                                style={{
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                    backgroundColor: msg.sender === "user" ? "#1c7ed6" : "#f1f3f5",
                                    color: msg.sender === "user" ? "white" : "black",
                                    padding: "8px 12px",
                                    borderRadius: "12px",
                                    maxWidth: "70%",
                                    wordBreak: "break-word",
                                }}
                            >
                                {msg.content}
                            </Text>
                        ))}
                        {isFetching && (
                            <Text
                                style={{
                                    alignSelf: "flex-start",
                                    fontStyle: "italic",
                                    color: "#868e96",
                                    padding: "8px 12px",
                                }}
                            >
                                Bot is typing...
                            </Text>
                        )}
                    </Stack>
                </ScrollArea>
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    placeholder="Type your message..."
                    minRows={1}
                    autosize
                />
                <Button onClick={handleSendMessage} fullWidth style={{ marginTop: 10 }}>
                    Send
                </Button>
            </Drawer>
            <Button
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                }}
                onClick={() => setOpened((prev) => !prev)}
            >
                {opened ? "Close Chat" : "Chat with us"}
            </Button>
        </>
    );
};

export default ChatBot;
