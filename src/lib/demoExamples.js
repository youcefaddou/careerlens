/**
 * Exemples de code de démonstration pour différents profils
 * Ces exemples sont utilisés à la fois côté client et côté serveur
 */
export const demoExamples = {
  frontend: {
    language: 'javascript',
    title: 'Animation de composants React avec transitions',
    description: 'Une fonction personnalisée pour animer les transitions de composants React',
    code: `// Animation de composants React avec hooks personnalisés
import { useState, useEffect, useRef } from 'react';

// Hook personnalisé pour les animations
function useAnimatedTransition(isVisible, duration = 300) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [animationState, setAnimationState] = useState(
    isVisible ? 'entered' : 'exited'
  );
  
  useEffect(() => {
    let timeoutId;
    
    if (isVisible) {
      setShouldRender(true);
      // Utilisation d'un setTimeout pour permettre l'animation ENTER
      timeoutId = setTimeout(() => {
        setAnimationState('entered');
      }, 10);
    } else {
      setAnimationState('exiting');
      // Attendre la fin de l'animation avant de retirer du DOM
      timeoutId = setTimeout(() => {
        setAnimationState('exited');
        setShouldRender(false);
      }, duration);
    }
    
    return () => clearTimeout(timeoutId);
  }, [isVisible, duration]);
  
  return { shouldRender, animationState };
}

// Exemple d'utilisation du hook
function FadeTransition({ isVisible, children, duration = 300 }) {
  const { shouldRender, animationState } = useAnimatedTransition(
    isVisible, 
    duration
  );
  
  if (!shouldRender) return null;
  
  // Définition des styles en fonction de l'état d'animation
  const styles = {
    transition: \`opacity \${duration}ms ease-in-out\`,
    opacity: animationState === 'exiting' ? 0 : 1
  };
  
  return (
    <div style={styles}>
      {children}
    </div>
  );
}

// Exemple d'utilisation du composant
function App() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Masquer' : 'Afficher'}
      </button>
      
      <FadeTransition isVisible={isVisible}>
        <div className="card">
          Contenu animé avec une belle transition !
        </div>
      </FadeTransition>
    </div>
  );
}`
  },
  
  backend: {
    language: 'javascript',
    title: 'API REST avec Express et middleware d\'authentification',
    description: 'Un exemple de middleware d\'authentification JWT pour sécuriser les routes API',
    code: `// API REST avec Express et middleware d'authentification JWT
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Base de données simulée des utilisateurs
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' }
];

// Clé secrète pour JWT
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';

// Middleware d'authentification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
    
    req.user = user;
    next();
  });
}

// Middleware de vérification des rôles
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    next();
  };
}

// Route de connexion
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }
  
  // Générer un token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ token });
});

// Route protégée pour tous les utilisateurs authentifiés
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  
  // Ne pas renvoyer le mot de passe
  const { password, ...userInfo } = user;
  
  res.json(userInfo);
});

// Route protégée pour les admins uniquement
app.get('/api/admin', authenticateToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Accès admin autorisé' });
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});`
  },
  
  fullstack: {
    language: 'javascript',
    title: 'Implémentation d\'une architecture serverless',
    description: 'Exemple de fonctions serverless avec API Gateway et DynamoDB',
    code: `// Architecture serverless avec AWS Lambda et DynamoDB
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Initialisation du client DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || 'Tasks';

// Handler de création de tâche
exports.createTask = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { title, description, userId } = requestBody;
    
    if (!title || !userId) {
      return formatResponse(400, {
        message: 'Le titre et l\\'identifiant utilisateur sont requis'
      });
    }
    
    const task = {
      id: uuidv4(),
      title,
      description: description || '',
      userId,
      createdAt: new Date().toISOString(),
      completed: false
    };
    
    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: task
    }).promise();
    
    return formatResponse(201, task);
  } catch (error) {
    console.error('Erreur:', error);
    return formatResponse(500, { message: 'Erreur serveur' });
  }
};

// Handler de récupération des tâches
exports.getTasks = async (event) => {
  try {
    const userId = event.pathParameters?.userId;
    
    if (!userId) {
      return formatResponse(400, {
        message: 'L\\'identifiant utilisateur est requis'
      });
    }
    
    const result = await dynamoDB.query({
      TableName: TABLE_NAME,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise();
    
    return formatResponse(200, result.Items);
  } catch (error) {
    console.error('Erreur:', error);
    return formatResponse(500, { message: 'Erreur serveur' });
  }
};

// Helper pour formater la réponse API Gateway
function formatResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
}`
  },
  
  mobile: {
    language: 'javascript',
    title: 'Composant React Native avec navigation',
    description: 'Implémentation d\'un écran de liste avec navigation dans React Native',
    code: `// Écran de liste d'articles dans React Native avec navigation
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Composant d'élément de liste
const ArticleItem = ({ article, onPress }) => (
  <TouchableOpacity 
    style={styles.articleItem}
    onPress={() => onPress(article)}
  >
    <Image 
      source={{ uri: article.imageUrl }} 
      style={styles.articleImage}
      resizeMode="cover"
    />
    <View style={styles.articleContent}>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleExcerpt} numberOfLines={2}>
        {article.excerpt}
      </Text>
      <View style={styles.articleMeta}>
        <Text style={styles.articleDate}>{article.publishDate}</Text>
        <Text style={styles.articleCategory}>{article.category}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Écran principal
function ArticlesScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  // Simuler un chargement d'API
  useEffect(() => {
    setTimeout(() => {
      setArticles([
        {
          id: '1',
          title: 'Introduction à React Native',
          excerpt: 'React Native vous permet de créer des applications...',
          imageUrl: 'https://example.com/image1.jpg',
          publishDate: '18 oct. 2023',
          category: 'Développement'
        },
        {
          id: '2',
          title: 'Styles et mise en page avec Flexbox',
          excerpt: 'Flexbox est un module de mise en page CSS...',
          imageUrl: 'https://example.com/image2.jpg',
          publishDate: '10 oct. 2023',
          category: 'Design'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text>Chargement des articles...</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ArticleItem 
              article={item} 
              onPress={(article) => {
                navigation.navigate('ArticleDetail', { 
                  articleId: article.id,
                  title: article.title
                });
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}`
  },
  
  design: {
    language: 'javascript',
    title: 'Animation d\'interface avec GSAP',
    description: 'Création d\'animations fluides avec la bibliothèque GSAP',
    code: `// Animation d'interface utilisateur avec GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Fonction d'initialisation des animations
function initAnimations() {
  // Animation du header au chargement
  const headerTimeline = gsap.timeline();
  
  headerTimeline
    .from('.header-logo', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.nav-item', {
      y: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5');
  
  // Animation des sections au scroll
  const sections = document.querySelectorAll('.content-section');
  
  sections.forEach(section => {
    // Animation d'entrée du titre de la section
    gsap.from(section.querySelector('.section-title'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Animation des éléments de la section
    gsap.from(section.querySelectorAll('.section-item'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    });
  });
}

// Initialiser les animations au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});`
  }
}; 