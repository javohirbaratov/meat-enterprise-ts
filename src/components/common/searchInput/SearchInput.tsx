import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { Dispatch } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F0F2F5",
  "&:hover": {
    backgroundColor: "#dcdedf",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const MySearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: "#747C85",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

type SearchInputProps = {
  value: string;
  setValue: Dispatch<string>;
};

const SearchInput: React.FC<SearchInputProps> = ({ setValue, value }) => {
  return (
    <Box style={{ position: "sticky", top: 0 }}>
      <Toolbar sx={{ p: 0 }}>
        <Search>
          <SearchIconWrapper>
            <MySearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Qidirish..."
            inputProps={{ "aria-label": "search" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Search>
      </Toolbar>
    </Box>
  );
};

export default SearchInput;
