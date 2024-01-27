import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputBase, Toolbar, Box, AppBar } from '@mui/material';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchBar({query, setQuery, createNew}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <nav className="bg-green-300 rounded-t-lg">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {createNew?<Button onClick={e => createNew()} variant="outlined" color="success">Add New</Button>:<></>}
            <div className="flex md:order-2">
              <div className="relative">
                <input type="text" value={query} onChange={e=>setQuery(e.target.value)} id="search-navbar" className="block w-full p-2 ps-10 text-sm border-none rounded-lg focus:ring-green-800 focus:border-green-600 " placeholder="Search..."/>
              </div>
            </div>
          </div>
      </nav>
    </Box>
  );
}