import { useRef, useState } from 'react';


enum Operator {
  add,
  subtract,
  multiply,
  divide
}


const useCalculator = () => {

  const [ number, setNumber ] = useState('0');
  const [ previousNumber, setPreviousNumber ] = useState('0');

  const lastOperation = useRef<Operator>();

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
    const num1 = Number(previousNumber);
    const num2 = Number(number);

    switch(lastOperation.current){
      case Operator.add:
        setNumber(`${ num1 + num2 }`);
        break;

      case Operator.subtract:
        setNumber(`${ num1 - num2 }`);
        break;

      case Operator.divide:
        setNumber(`${ num1 / num2 }`);
        break;

      case Operator.multiply:
        setNumber(`${ num1 * num2 }`);
        break;

      default:
        throw new Error('Operation not implemented');
    }

    setPreviousNumber('0');
  }



  return {
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
  }
}

export default useCalculator
