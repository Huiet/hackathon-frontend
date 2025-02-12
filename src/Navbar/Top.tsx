import { Box, Center, Group } from "@mantine/core";
import { IriLogo } from "./IRILogo";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import { Notifications } from "../components/Notifications";

export const Top = () => {
    const userId = "1"
    return (
        <Group justify={"space-between"} align="center">
            <Center p={"sm"} pl={0}>
                <IriLogo />
            </Center>
            <Group spacing="md">
                <Notifications
                    userId={userId}
                />
                <Box pr={"md"}>
                    <ColorSchemeSwitcher />
                </Box>
            </Group>
        </Group>
    );
};
