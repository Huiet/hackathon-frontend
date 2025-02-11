import { Center, Group } from "@mantine/core";
import { IriLogo } from "./IRILogo";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";

export const Top = () => {
  return (
    <Group justify={"space-between"}>
      <Center p={"sm"} pl={0}>
        <IriLogo />
      </Center>
      <ColorSchemeSwitcher />
    </Group>
  );
};
