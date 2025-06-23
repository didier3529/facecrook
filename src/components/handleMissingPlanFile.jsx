import React, { useState, useRef, useContext } from 'react'
import { PlanContext } from './PlanContext'

const defaultPlan = {
  name: 'Default Plan',
  steps: [
    { id: 1, title: 'Welcome to FaceCrook', completed: false },
    { id: 2, title: 'Create your first spoof persona', completed: false },
    { id: 3, title: 'Mint a mock NFT', completed: false }
  ]
}

function HandleMissingPlanFile() {
  const { setPlan } = useContext(PlanContext)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onFileSelect = e => {
    setError('')
    const file = e.target.files[0]
    if (!file) {
      return
    }
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Please select a valid JSON file.')
      resetFileInput()
      return
    }
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result)
        const isValidPlan =
          parsed &&
          typeof parsed === 'object' &&
          typeof parsed.name === 'string' &&
          Array.isArray(parsed.steps) &&
          parsed.steps.every(
            step =>
              step &&
              typeof step === 'object' &&
              typeof step.id === 'number' &&
              typeof step.title === 'string' &&
              typeof step.completed === 'boolean'
          )
        if (!isValidPlan) {
          throw new Error('Invalid structure')
        }
        setPlan(parsed)
      } catch {
        setError('Invalid plan file structure.')
      } finally {
        resetFileInput()
      }
    }
    reader.onerror = () => {
      setError('Error reading file.')
      resetFileInput()
    }
    reader.readAsText(file)
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onGenerateDefault = () => {
    setError('')
    setPlan(defaultPlan)
  }

  return (
    <div className="missing-plan-container">
      <h2 className="missing-plan-title">No Plan File Found</h2>
      <p className="missing-plan-message">
        To proceed, upload a plan file or generate a default plan.
      </p>
      {error && <p className="missing-plan-error">{error}</p>}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="missing-plan-file-input"
        onChange={onFileSelect}
        style={{ display: 'none' }}
      />
      <div className="missing-plan-buttons">
        <button
          type="button"
          className="btn upload-btn"
          onClick={triggerFileInput}
        >
          Upload Plan File
        </button>
        <button
          type="button"
          className="btn generate-btn"
          onClick={onGenerateDefault}
        >
          Generate Default Plan
        </button>
      </div>
    </div>
  )
}

export default HandleMissingPlanFile