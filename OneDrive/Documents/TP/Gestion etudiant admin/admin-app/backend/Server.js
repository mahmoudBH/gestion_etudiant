const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Pour analyser les requêtes JSON

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mahmoud bh',
  database: 'gestion_etudiant',
});

db.connect((err) => {
  if (err) {
    console.log('Échec de la connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données gestion_etudiant');
  }
});

// Route pour l'inscription d'admin
app.post('/api/admin/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Vérifier si l'admin existe déjà
  const queryCheck = 'SELECT * FROM admin WHERE email = ?';
  db.query(queryCheck, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur du serveur' });
    if (results.length > 0) return res.status(400).json({ error: 'L\'email existe déjà' });

    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer le nouvel admin dans la base de données
    const queryInsert = 'INSERT INTO admin (name, email, password) VALUES (?, ?, ?)';
    db.query(queryInsert, [name, email, hashedPassword], (err, results) => {
      if (err) return res.status(500).json({ error: 'Erreur du serveur' });
      return res.status(201).json({ message: 'Admin créé avec succès' });
    });
  });
});

// Route pour la connexion d'admin
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
  
    // Vérifier les informations d'identification
    const query = 'SELECT * FROM admin WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Erreur du serveur' });
      if (results.length === 0) return res.status(401).json({ error: 'Email ou mot de passe invalide' });
  
      const user = results[0];
  
      // Comparer le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Email ou mot de passe invalide' });
      }
  
      // Générer le token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
  
      // Renvoie la réponse avec le nom, le token et un message
      return res.status(200).json({
        message: 'Connexion réussie',
        token,
        user: { name: user.name, email: user.email }, // Ajout du nom de l'utilisateur
      });
    });
  });
  

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
