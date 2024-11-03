const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database configuration

// Lihat semua aktivitas
router.get('/view', (req, res) => {
    const query = "SELECT * FROM activities WHERE user_id = ?";
    db.query(query, [req.session.user.id], (err, results) => {
        if (err) throw err;
        res.render('view', { activities: results });
    });
});

// Tambah aktivitas baru - Formulir tambah aktivitas
router.get('/add', (req, res) => {
    res.render('add');
});

// Proses tambah aktivitas baru
router.post('/add', (req, res) => {
    const { name, description } = req.body;
    const query = "INSERT INTO activities (name, description, user_id) VALUES (?, ?, ?)";
    db.query(query, [name, description, req.session.user.id], (err, result) => {
        if (err) throw err;
        res.redirect('/activity/view');
    });
});

// Edit aktivitas - Formulir edit aktivitas
router.get('/edit', (req, res) => {
    const query = "SELECT * FROM activities WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err) throw err;
        res.render('edit', { activity: results[0] });
    });
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

// Hapus aktivitas
router.get('/delete/:id', (req, res) => {
    const query = "DELETE FROM activities WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/activity/view');
    });
});

module.exports = router;
