import React from 'react';
import List from '@mui/material/List';
import MemoListItem from './MemoListItem';
import Item from './models/item.model';

interface MemoListProps {
    items: Item[];
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function MemoList({ items, onToggleComplete, onDelete }: MemoListProps) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {items.map((item) => (
                <MemoListItem
                    key={item.id}
                    item={item}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </List>
    );
}
