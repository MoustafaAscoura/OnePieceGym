import { Box } from "@mui/material";
import SearchBar from "@/app/ui/dashboard/trainees/searchBar"
import TraineesTable from "@/app/ui/dashboard/trainees/traineesTable";

export default function Trainees () {
    return (<>
        <Box className="bg-green-100">
            <SearchBar />
            <TraineesTable />
        </Box>
        </>
    );
}