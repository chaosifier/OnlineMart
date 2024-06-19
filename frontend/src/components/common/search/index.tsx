import {
    useMantineTheme,
    rem,
    TextInput,
    UnstyledButton,
    ActionIcon,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useCallback, useState } from "react";

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

const Search : React.FC<SearchComponentProps> = ({ onSearch })=>{

    const theme = useMantineTheme();
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch =()=>{
        onSearch(searchTerm);
    }
    
    return (
        <TextInput
            onKeyUp={(e)=> (e.key === 'Enter' || e.keyCode === 13) && handleSearch()}
            radius="xl"
            value={searchTerm}
            onChange={handleInputChange}
            size="md"
            placeholder="Search Products"
            rightSectionWidth={42}
            leftSection={
                <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                />
            }
            rightSection={
                <UnstyledButton onClick={handleSearch}>
                    <ActionIcon
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
                </UnstyledButton>
            }
        />
    );
};

export default Search;
