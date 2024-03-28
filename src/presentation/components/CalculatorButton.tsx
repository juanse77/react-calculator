import { Pressable, Text } from 'react-native'
import { colors, styles } from '../../config/theme/app-theme';

interface Props {
  label: string;
  color?: string;
  doubleSize?: boolean;
  blackText?: boolean;
}

const CalculatorButton = ({
  label,
  color = colors.darkGray,
  doubleSize = false,
  blackText = false
} : Props) => {
  return (
    <Pressable style={ ({pressed}) => ({
      ...styles.button,
      backgroundColor: color,
      width: (doubleSize) ? 180 : 80, 
      opacity: (pressed) ? 0.8 : 1
    }) }>
      <Text style={{
        ...styles.buttonText,
        color: (blackText) ? 'black' : 'white'
      }}>{label}</Text>
    </Pressable>
  )
}

export default CalculatorButton
