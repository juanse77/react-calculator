import { useEffect, useRef, useState } from 'react';


enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷'
}



const useCalculator = () => {

  const [ formula, setFormula ] = useState('');

  const [ number, setNumber ] = useState('0');
  const [ previousNumber, setPreviousNumber ] = useState('0');

  const lastOperation = useRef<Operator>();

  
  useEffect(() => {
    if(lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    }else{
      setFormula(number);
    }
  }, [number]);


  useEffect(() => {
    const subResult = calculateSubResult();
    setPreviousNumber(`${subResult}`);
  }, [formula]);


  const buildNumber = ( numberString: string ) => {

    if(numberString === '.' && number.includes('.')) return;

    if(number.startsWith('0') || number.startsWith('-0')) {
      if(numberString === '0' && !number.includes('.')){
        return;
      }

      if(number === '0' && numberString !== '.'){
        return setNumber(numberString);
      }

      if(number === '-0' && numberString !== '.'){
        return setNumber('-' + numberString);
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  }


  const toggleSign = () => {
    if(number.includes('-')){
      return setNumber(number.replace('-', ''));
    }

    setNumber('-' + number)
  }


  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
    lastOperation.current = undefined;
    setFormula('');
  }


  const deleteLast = () => {
    let currentSign = '';
    let temporalNumber = number;

    if(number.includes('-')){
      currentSign = '-';
      temporalNumber = number.substring(1);
    }

    if(temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1));
    }else{
      return setNumber('0');
    }
  }


  const setLastNumber = () => {
    calculateResult();

    if(number.endsWith('.')){
      setPreviousNumber(number.slice(0, -1));
    }else{
      setPreviousNumber(number);
    }

    setNumber('0');
  }


  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  }

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  }

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  }

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  }


  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);

    lastOperation.current = undefined;
    setPreviousNumber('0');
  }


  const calculateSubResult = (): number => {

    const [firstValue, operation, secondValue ] = formula.split(' ')

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if(isNaN(num2)) return num1;

    switch(operation){
      case Operator.add:
        return num1 + num2;

      case Operator.subtract:
        return num1 - num2;

      case Operator.divide:
        return num1 / num2;

      case Operator.multiply:
        return num1 * num2;

      default:
        throw new Error('Operation not implemented');
    }

  }


  return {
    number,
    previousNumber,
    formula,

    buildNumber,
    toggleSign,
    clean,
    deleteLast,
 
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,

    calculateResult,
  }
}

export default useCalculator
