const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Render halaman register
router.get('/register', (req, res) => {
    res.render('register');
});

// Proses register user
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.redirect('/auth/login');
    });
});

// Render halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

// Proses login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.redirect('/auth/profile');
            } else {
                res.send('Incorrect password');
            }
        } else {
            res.send('User not found');
        }
    });
});

// Render halaman profil user
router.get('/profile', (req, res) => {
    if (req.session.user) {
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/auth/login');
    }
});

// Proses Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

// Tambah Aktivitas Baru
router.get('/add', (req, res) => {
    if (req.session.user) {
        res.render('add'); // Render halaman tambah aktivitas
    } else {
        res.redirect('/auth/login');
    }
});

// Edit Aktivitas
router.get('/edit/:id', (req, res) => {
    if (req.session.user) {
        const query = "SELECT * FROM activities WHERE id = ?";
        db.query(query, [req.params.id], (err, result) => {
            if (err) throw err;
            res.render('edit', { activity: result[0] }); // Render halaman edit aktivitas
        });
    } else {
        res.redirect('/auth/login');
    }
});

// Proses edit aktivitas
router.post('/edit', (req, res) => {
    const { name, description } = req.body;
    const query = "UPDATE activities SET name = ?, description = ? WHERE id = ?";
    db.query(query, [name, description, req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/activity/view');
    });
});

// Hapus Aktivitas
router.get('/delete/:id', (req, res) => {
    if (req.session.user) {
        const query = "DELETE FROM activities WHERE id = ?";
        db.query(query, [req.params.id], (err, result) => {
            if (err) throw err;
            res.redirect('/auth/view'); // Redirect ke halaman lihat aktivitas setelah dihapus
        });
    } else {
        res.redirect('/auth/login');
    }
});

// Lihat Aktivitas
router.get('/view', (req, res) => {
    if (req.session.user) {
        const query = "SELECT * FROM activities WHERE user_id = ?";
        db.query(query, [req.session.user.id], (err, results) => {
            if (err) throw err;
            res.render('view', { activities: results }); // Render halaman lihat aktivitas
        });
    } else {
        res.redirect('/auth/login');
    }
});

module.exports = router;
