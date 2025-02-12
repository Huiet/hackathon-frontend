import React, { useState } from "react";
import { Button, Drawer, Textarea, Stack, Text, ScrollArea } from "@mantine/core";
import { useChatBotResponse } from "../api/serviice"; // Your async function for fetching chatbot responses

const ChatBot: React.FC = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]); // Add user's message to the chat
        setInput("");

        // Add "Bot is typing..." message temporarily
        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Bot is typing..." },
        ]);

        setLoading(true);
        setError(null);

        try {
            // Call the async function to fetch the chatbot response
            const data = await useChatBotResponse(input, messages);

            // Remove "Bot is typing..." and append the actual response
            setMessages((prev) => [
                ...prev.slice(0, -1), // Remove "Bot is typing..."
                { role: "assistant", content: data.reply } // Append the bot's actual response
            ]);
        } catch (err) {
            console.error("Error fetching response:", err);
            setError("Oops! Something went wrong. Please try again.");
            setMessages((prev) => [
                ...prev.slice(0, -1), // Remove "Bot is typing..."
                { role: "assistant", content: "Oops! Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
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
                                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                                    backgroundColor: msg.role === "user" ? "#1c7ed6" : "#f1f3f5",
                                    color: msg.role === "user" ? "white" : "black",
                                    padding: "8px 12px",
                                    borderRadius: "12px",
                                    maxWidth: "70%",
                                    wordBreak: "break-word",
                                }}
                            >
                                {msg.content}
                            </Text>
                        ))}
                        {error && (
                            <Text color="red" style={{ marginTop: 10 }}>
                                {error}
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
                <Button onClick={handleSendMessage} disabled={loading} fullWidth style={{ marginTop: 10 }}>
                    {loading ? "Sending..." : "Send"}
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
