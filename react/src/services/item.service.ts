import Item from '../models/item.model';

export async function getAllItems() {
    try {
        const response = await fetch('http://localhost:5000/api/item');
        if (!response.ok) {
            throw new Error('HTTP error with status ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function addItem(item: Item) {
    try {
        const response = await fetch(
            'http://localhost:5000/api/item',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Failed to add item:', error);
    }
}

export async function updateItem(item: Item) {
    try {
        const response = await fetch(
            `http://localhost:5000/api/item`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Failed to update item:', error);
    }
}

export async function deleteItem(id: number) {
    try {
        const response = await fetch(
            'http://localhost:5000/api/item/',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id}),
            }
        )
        return response.json();
    } catch (err) {
        console.error('Failed to delete item:', err);
    }
}
