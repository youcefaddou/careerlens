import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request) {
  try {
    console.log('📝 API Register: Début de la requête d\'inscription')
    const body = await request.json()
    const { firstName, lastName, email, password, profileType } = body

    console.log('📝 API Register: Données reçues', { firstName, lastName, email, profileType })

    // Valider les champs requis
    if (!firstName || !lastName || !email || !password) {
      console.log('⚠️ API Register: Champs manquants')
      return NextResponse.json(
        { success: false, message: 'Tous les champs sont obligatoires' },
        { status: 400 }
      )
    }

    // Connexion à la base de données
    console.log('📝 API Register: Tentative de connexion à MongoDB')
    await connectToDatabase()
    console.log('📝 API Register: Connexion à MongoDB réussie')

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('⚠️ API Register: Email déjà utilisé', email)
      return NextResponse.json(
        { success: false, message: 'Cet email est déjà utilisé' },
        { status: 409 }
      )
    }

    // Créer le nouvel utilisateur
    console.log('📝 API Register: Création d\'un nouvel utilisateur')
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      profileType: profileType || 'recruiter',
    })

    await newUser.save()
    console.log('✅ API Register: Utilisateur créé avec succès', newUser._id.toString())

    // Retourner une réponse réussie sans le mot de passe
    const userResponse = {
      id: newUser._id.toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      profileType: newUser.profileType,
    }

    return NextResponse.json({ success: true, user: userResponse }, { status: 201 })
  } catch (error) {
    console.error('❌ API Register: Erreur lors de l\'inscription:', error)
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    )
  }
} 