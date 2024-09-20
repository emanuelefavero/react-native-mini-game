import { useState } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useNumberDispatch } from '@/context/NumberContext'
import { useGameDispatch } from '@/context/GameStateContext'
import { StartGameScreenProps } from '@/types/screens'
import PrimaryButton from '@/components/PrimaryButton'
import Title from '@/components/Title'

export default function StartGameScreen({ navigation }: StartGameScreenProps) {
  const numberDispatch = useNumberDispatch()
  const gameDispatch = useGameDispatch()
  const [inputNumber, setInputNumber] = useState('')

  const handleConfirm = () => {
    // Validate input
    // TODO: Add a toast message for invalid input
    if (inputNumber === '') return
    if (parseInt(inputNumber) < 1 || parseInt(inputNumber) > 100) return
    if (isNaN(parseInt(inputNumber))) return
    if (parseInt(inputNumber) % 1 !== 0) return

    numberDispatch({ type: 'setNumber', payload: parseInt(inputNumber) })
    gameDispatch({ type: 'setGameState', payload: 'playing' })
  }

  return (
    <View style={globalStyles.screenContainer}>
      <Title>Guess My Number</Title>

      {/* TODO: Separate input into its own component */}
      <TextInput
        value={inputNumber}
        onChangeText={(text) => setInputNumber(text.replace(/[^0-9]/g, ''))}
        style={styles.input}
        keyboardType='numeric'
        keyboardAppearance='dark'
        placeholder='Type a number'
        placeholderTextColor='#FDA4AF'
      />

      <View style={styles.buttonsContainer}>
        <PrimaryButton onPress={() => setInputNumber('')}>Reset</PrimaryButton>
        <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 6,
    fontSize: 30,
    borderBottomColor: '#FFE4E6',
    color: '#FFE4E6',
    borderBottomWidth: 1.2,
    marginBottom: 30,
    maxWidth: 215,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 285,
  },
})
