import { FormControl, Input, FormHelperText, Button } from "@mui/joy";
import { Search } from "@mui/icons-material";

const SearchUserButton = () => {
    return (
        <Button
            variant="solid"
            color="primary"
            startDecorator={<Search />}
            size="lg"
        >
            Search
        </Button>
    );
};

const UserSearch = () => {
    return (
        <FormControl>
            <Input
                endDecorator={<SearchUserButton />}
                placeholder="Search users..."
                size="lg"
            />
            <FormHelperText>1029 users found.</FormHelperText>
        </FormControl>
    );
};

export default UserSearch;
