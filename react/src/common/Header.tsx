import { Typography, Toolbar, AppBar, Button } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';

function Header() {
    return (
        <>
            <AppBar className="mb-7">
                <Toolbar>
                    <ChecklistIcon></ChecklistIcon>
                    <Typography variant="h6" component="div">
                        Memo App
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
