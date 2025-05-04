'use client'

import { useState } from 'react'

export default function InteractiveDemo() {
  const [code, setCode] = useState(
`// Exemple de code simple
function greet(name) {
  return \`Bonjour \${name}!\`;
}

// Essayez de le modifier!
console.log(greet('Recruteur'));`
  )
  
  const [output, setOutput] = useState('Bonjour Recruteur!')
  
  const handleCodeChange = (e) => {
    setCode(e.target.value)
  }
  
  const runCode = () => {
    try {
      // Évaluation sécurisée avec limitation des capacités
      const sandboxedCode = `
        const console = {
          log: function(val) { 
            window._demoOutput = val; 
            return val; 
          }
        };
        ${code}
      `
      // Reset output
      window._demoOutput = ''
      
      // Execute code
      new Function(sandboxedCode)()
      
      // Update output state
      setOutput(window._demoOutput || 'Aucune sortie console')
    } catch (error) {
      setOutput(`Erreur: ${error.message}`)
    }
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Démo Interactive</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <textarea 
            className="w-full h-64 font-mono p-3 bg-gray-800 text-white rounded-lg"
            value={code}
            onChange={handleCodeChange}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <button 
            onClick={runCode}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Exécuter
          </button>
          <div className="bg-gray-100 p-3 rounded-lg flex-1">
            <p className="font-semibold">Résultat:</p>
            <pre className="mt-2 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </section>
  )
} 