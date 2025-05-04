import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careerlens'

// Mémoisation de la connexion pour éviter de multiples connexions
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log('Utilisation de la connexion MongoDB existante')
    return cached.conn
  }

  if (!cached.promise) {
    console.log('Tentative de connexion à MongoDB avec URI:', MONGODB_URI)
    const opts = {
      bufferCommands: false,
    }

    mongoose.set('strictQuery', true)
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ Connexion MongoDB établie avec succès')
        return mongoose
      })
      .catch((error) => {
        console.error('❌ Erreur de connexion à MongoDB:', error)
        throw error
      })
  }
  
  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error('❌ Erreur lors de l\'attente de la connexion MongoDB:', error)
    throw error
  }
}

export default connectToDatabase 