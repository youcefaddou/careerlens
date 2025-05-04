import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^\S+@\S+\.\S+$/.test(value)
        },
        message: "Format d'email invalide",
      },
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
      select: false, // Ne renvoie pas le mot de passe dans les requêtes
    },
    profileType: {
      type: String,
      enum: ['recruiter', 'candidate'],
      default: 'recruiter',
    },
    image: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Méthode pour vérifier le mot de passe
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Middleware pre-save pour hasher le mot de passe avant de sauvegarder
UserSchema.pre('save', async function (next) {
  // Seulement hasher le mot de passe s'il est modifié (ou nouveau)
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Méthode pour obtenir les initiales de l'avatar
UserSchema.virtual('avatarInitials').get(function () {
  return this.firstName.charAt(0) + this.lastName.charAt(0)
})

// Ne pas utiliser le modèle s'il existe déjà (important pour Next.js hot reloading)
const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User 