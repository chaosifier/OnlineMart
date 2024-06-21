import {
    useMantineTheme,
    rem,
    TextInput,
    ActionIcon,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

interface SearchComponentProps {
    onChange?: (c: string) => void;
    onClick?: (c: string) => void;
    onDebounce?: (c: string) => void;
    enableOnEnter?: boolean;
    disableRightSection?: boolean;
    placeholder?: string;
    useDebounce?: boolean;
    debounceWaitTime?: number;
}

const Search: React.FC<SearchComponentProps> = ({
    onChange,
    onClick,
    onDebounce,
    placeholder,
    enableOnEnter = true,
    disableRightSection = false,
    debounceWaitTime = 200,
}) => {
    const theme = useMantineTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [debounced] = useDebouncedValue(searchTerm, debounceWaitTime, {
        leading: true,
    });

    useEffect(() => {
        onDebounce && onDebounce(debounced);
    }, [debounced]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

        onChange && onChange(e.target.value);
    };

    const handleEnterPress = () => {
        enableOnEnter && onClick && onClick(searchTerm);
    };

    return (
        <TextInput
            onKeyUp={(e) =>
                (e.key === "Enter" || e.keyCode === 13) && handleEnterPress()
            }
            radius="xl"
            // value={searchTerm}
            onChange={handleInputChange}
            size="md"
            placeholder={placeholder}
            rightSectionWidth={42}
            leftSection={
                <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                />
            }
            rightSection={
                !disableRightSection && (
                    <ActionIcon
                        onClick={handleEnterPress}
                        size={32}
                        radius="xl"
                        color={theme.primaryColor}
                        variant="filled"
                    >
                        <IconArrowRight
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                )
            }
        />
    );
};

export default Search;
