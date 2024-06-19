import { Box, Text, Center } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function InputErrors(props: { messages: Array<string> }) {
    return (
        props.messages &&
        props.messages.length > 0 && (
            <div>
                {props.messages.map((m, i) => (
                    <Text key={i} component="div" c={"red"} mt={5} size="sm">
                        <Center inline>
                            <IconX size="0.9rem" stroke={1.5} />
                            <Box ml={7}>{m}</Box>
                        </Center>
                    </Text>
                ))}
            </div>
        )
    );
}
