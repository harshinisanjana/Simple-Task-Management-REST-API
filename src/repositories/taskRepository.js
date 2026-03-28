const pool = require('../config/db');

class TaskRepository {
    async create(task) {
        const { id, title, description, status } = task;
        const query = `
            INSERT INTO tasks (id, title, description, status)
            VALUES (?, ?, ?, ?)
        `;
        await pool.execute(query, [id, title, description, status]);
        return this.findById(id);
    }

    async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT id, title, description, status, created_at, updated_at
            FROM tasks
            WHERE deleted_at IS NULL
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;
        // Since limit/offset need to be numbers in prepared statements, cast them or pass securely
        const [rows] = await pool.query(query, [Number(limit), Number(offset)]);
        return rows;
    }

    async findById(id) {
        const query = `
            SELECT id, title, description, status, created_at, updated_at
            FROM tasks
            WHERE id = ? AND deleted_at IS NULL
        `;
        const [rows] = await pool.execute(query, [id]);
        return rows[0] || null;
    }

    async update(id, updates) {
        const fields = [];
        const values = [];

        if (updates.title !== undefined) {
            fields.push('title = ?');
            values.push(updates.title);
        }
        if (updates.description !== undefined) {
            fields.push('description = ?');
            values.push(updates.description);
        }
        if (updates.status !== undefined) {
            fields.push('status = ?');
            values.push(updates.status);
        }

        if (fields.length === 0) return this.findById(id);

        const query = `
            UPDATE tasks
            SET ${fields.join(', ')}
            WHERE id = ? AND deleted_at IS NULL
        `;
        values.push(id);

        const [result] = await pool.execute(query, values);
        if (result.affectedRows === 0) return null;
        
        return this.findById(id);
    }

    async softDelete(id) {
        const query = `
            UPDATE tasks
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE id = ? AND deleted_at IS NULL
        `;
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new TaskRepository();
