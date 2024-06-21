import { Flex, Loader } from "@mantine/core";

export const CenterPopLoader = () => {
    return (
        <Flex
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(2px)",
            }}
        >
            <Loader size={60} />
        </Flex>
    );
};
