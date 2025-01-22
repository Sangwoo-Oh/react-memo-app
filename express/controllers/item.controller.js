const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../items.json');


module.exports = {
    getItems: (req, res) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading items file', error: err });
            }

            try {
                const items = JSON.parse(data);
                res.json(items);
            } catch (parseError) {
                return res.status(500).json({ message: 'Error parsing JSON data', error: parseError });
            }
        });
    },
    addItem: (req, res) => {
        const { id, title, completed } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading items file', error: err });
            }

            try {
                const items = JSON.parse(data);

                const newItem = {
                    id: items.length > 0 ? items[items.length - 1].id + 1: 1,
                    title,
                    completed: false
                };
                items.push(newItem);
                fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8', (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ message: 'Error saving item', error: writeErr });
                    }
                    res.status(201).json(newItem);
                });
            } catch (parseError) {
                return res.status(500).json({ message: 'Error parsing JSON data', error: parseError });
            }
        });
    },
    updateItem: (req, res) => {
        const { id, title, completed } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading items file', error: err });
            }

            try {
                const items = JSON.parse(data);
                const itemIndex = items.findIndex((item) => item.id === id);

                if (itemIndex === -1) {
                    return res.status(404).json({ message: 'Item not found' });
                }

                items[itemIndex] = {
                    ...items[itemIndex], // keep the original properties
                    title: title !== undefined ? title : items[itemIndex].title,
                    completed: completed !== undefined ? completed : items[itemIndex].completed,
                };

                fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8', (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ message: 'Error saving item', error: writeErr });
                    }

                    return res.status(200).json(items[itemIndex]);
                });
            } catch (parseError) {
                return res.status(500).json({ message: 'Error parsing JSON data', error: parseError });
            }
        });
    },
    deleteItem: (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        fs.readFile(filePath, 'utf8', (err, data)=>{
            if (err) {
                throw err;
            }

            try {
                const items = JSON.parse(data);
                const itemIndex = items.findIndex((item)=>item.id === id);
                const deleteItem = items[itemIndex];

                if (itemIndex === -1) {
                    throw new Error('Item not found');
                }

                items.splice(itemIndex, 1);

                fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8', (writeErr)=>{
                    if (writeErr) {
                        throw writeErr;
                    }
                });
                return res.status(200).json(deleteItem);
            } catch (err) {
                res.status(500).json({ error: err });
            }
        });
    }
}
