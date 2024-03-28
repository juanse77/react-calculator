import { View, Text, Pressable } from 'react-native'
import { colors, styles } from '../../config/theme/app-theme';
import CalculatorButton from '../components/CalculatorButton';
import useCalculator from '../hooks/useCalculator';

const CalculatorScreen = () => {

  const {
    number,
    previousNumber,
    
    buildNumber,
    toggleSign,
    clean,
    deleteLast,

    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,

    calculateResult,
  } = useCalculator();


  return (
    <View style={ styles.calculatorContainer }>
      
      <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
      
        <Text 
          adjustsFontSizeToFit
          numberOfLines={1}
          style={ styles.mainResult }>{number}</Text>
        
        <Text 
          adjustsFontSizeToFit
          numberOfLines={1}
          style={ styles.subResult }>
            {(previousNumber === '0') ? ' ' : previousNumber}
        </Text>
      
      </View>

      <View style={ styles.row }>
        <CalculatorButton onPress={ clean } label="C" color={ colors.lightGray } blackText />
        <CalculatorButton onPress={ toggleSign } label="+/-" color={ colors.lightGray } blackText />
        <CalculatorButton onPress={ deleteLast } label="del" color={ colors.lightGray } blackText />
        <CalculatorButton onPress={ divideOperation } label="/" color={ colors.orange } />
      </View>

      <View style={ styles.row }>
        <CalculatorButton onPress={ () => buildNumber('7') } label="7" />
        <CalculatorButton onPress={ () => buildNumber('8') } label="8" />
        <CalculatorButton onPress={ () => buildNumber('9') } label="9" />
        <CalculatorButton onPress={ multiplyOperation } label="x" color={ colors.orange } />
      </View>

      <View style={ styles.row }>
        <CalculatorButton onPress={ () => buildNumber('4') } label="4" />
        <CalculatorButton onPress={ () => buildNumber('5') } label="5" />
        <CalculatorButton onPress={ () => buildNumber('6') } label="6" />
        <CalculatorButton onPress={ subtractOperation } label="-" color={ colors.orange } />
      </View>
      
      <View style={ styles.row }>
        <CalculatorButton onPress={ () => buildNumber('1') } label="1" />
        <CalculatorButton onPress={ () => buildNumber('2') } label="2" />
        <CalculatorButton onPress={ () => buildNumber('3') } label="3" />
        <CalculatorButton onPress={ addOperation } label="+" color={ colors.orange } />
      </View>

      <View style={ styles.row }>
        <CalculatorButton onPress={ () => buildNumber('0') } label="0" doubleSize />
        <CalculatorButton onPress={ () => buildNumber('.') } label="." />
        <CalculatorButton onPress={ calculateResult } label="=" color={ colors.orange } />
      </View>


    </View>    
  )
}

export default CalculatorScreen
