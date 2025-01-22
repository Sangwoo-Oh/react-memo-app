import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Item from './models/item.model.ts';
import TextField from '@mui/material/TextField';
import * as ItemService from './services/item.service.ts';
import SaveIcon from '@mui/icons-material/Save';

interface MemoListItemProps {
    item: Item;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function MemoListItem({ item, onToggleComplete, onDelete }: MemoListItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(item.title);

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleSaveEdit() {
        const updatedItem = {
            ...item,
            title: editTitle,
        };

        ItemService.updateItem(updatedItem)
        .then(()=>{
            setIsEditing(false);
            setEditTitle(editTitle);
        }).catch((error)=>{
            console.error('Error updating item:', error);
        })
    }

    return (
        <ListItem>
                <Checkbox
                    onChange={() => onToggleComplete(item.id)}
                    checked={item.completed}
                />
                {isEditing ? (
                    <>
                        <TextField
                            fullWidth={true}
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEdit();
                            }}
                            sx={{
                                "& .MuiInputBase-input": {
                                    padding: "6px",
                                },
                            }}
                        />
                        <Tooltip title="Save">
                            <IconButton onClick={handleSaveEdit}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <ListItemText
                            primary={editTitle}
                            className={item.completed ? 'line-through' : ''}
                        />
                        <Tooltip title="Edit">
                            <IconButton onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => onDelete(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
        </ListItem>
    );
};
