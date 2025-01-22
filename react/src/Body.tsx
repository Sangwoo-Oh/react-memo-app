import { useState, useEffect } from 'react';
import {Container, TextField, Button, Grid} from '@mui/material';
import Item from './models/item.model.ts';
import * as ItemService from './services/item.service.ts';
import MemoList from './MemoList.tsx';

function Body () {
    const [itemList, setItemList] = useState<Item[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const fetchItems = async () => {
            const currentItemList = await ItemService.getAllItems();
            setItemList(currentItemList);
        };

        fetchItems();
    }, []);

    function handleSave(e: any) {
        e.preventDefault();

        const newId = itemList.length > 0 ? itemList[itemList.length - 1].id + 1 : 1 ;
        const newMemo = {id: newId, title: title, completed: false};

        ItemService.addItem(newMemo);
        setItemList([...itemList, newMemo]);
        setTitle("");
    }

    function toggleComplete(id: number) {
        const index = itemList.findIndex(item => item.id === id);

        const updatedItem = {
            ...itemList[index],
            completed: !itemList[index].completed,
        };


        ItemService.updateItem(updatedItem)
            .then(() => {
                const updatedList = [...itemList];
                updatedList[index] = updatedItem;
                setItemList(updatedList);
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    }

    function handleDelete(id: number) {
        ItemService.deleteItem(id)
        .then(()=>{
            const updatedList = itemList.filter(item => item.id !== id);
            setItemList(updatedList);
        }).catch((error)=>{
            console.error('Error deleting item:', error);
        });
    }

    return (
        <div className="mt-20">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <MemoList
                        items={itemList}
                        onToggleComplete={toggleComplete}
                        onDelete={handleDelete}
                    ></MemoList>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Container maxWidth="lg">
                        <form onSubmit={handleSave}>
                            <TextField
                                label="memo"
                                fullWidth
                                margin="normal"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Button
                                type="submit"
                                className="mx-auto block mr-0"
                                variant="contained"
                                loadingPosition="center"
                                disabled={title.length === 0}
                                >ADD</Button>
                        </form>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}

export default Body;
