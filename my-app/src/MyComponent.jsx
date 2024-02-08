import { useState } from 'react';
import styles from './MyComponent.module.css';

const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', '=', 'C'];

export const MyComponent = () => {
	//Объявляем переменные
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isResult, setIsResult] = useState(false);

	const onClickNumber = (event) => {
		const { target } = event;
		let value = target.textContent;
		// Обработчик события и условия при нажатия на кнопки
		if (target.className === 'button' && operator === '') {
			setOperand1(operand1 + value);
			setIsResult(false);
		}

		if (target.className === 'button' && operand1 !== '' && operator !== '') {
			setOperand2(operand2 + value);
			setIsResult(false);
		}
		// Сброс всех значений
		if (value === 'C') {
			setOperand1('');
			setOperand2('');
			setOperator('');
			setIsResult(false);
			return;
		} else if (value === '=' && operand1 !== '' && operand2 !== '') {
			if (operator === '+') {
				setOperand1(Number(operand1) + Number(operand2));
			} else if (operator === '-') {
				setOperand1(Number(operand1) - Number(operand2));
			}
			setIsResult(!isResult);
			setOperator('');
			setOperand2('');
		} else if (
			target.className === 'buttonOperators' &&
			operand1 !== '' &&
			value !== '=' &&
			operand2 === ''
		) {
			setOperator(value);
			setIsResult(false);
			return;
		} else if (
			target.className === 'buttonOperators' &&
			operand2 !== '' &&
			value !== '=' &&
			operator !== ''
		) {
			// При повторном нажатии оператора при двух операндах происходит расчет
			setOperator(value);
			if (operator === '+') {
				setOperand1(Number(operand1) + Number(operand2));
			} else if (operator === '-') {
				setOperand1(Number(operand1) - Number(operand2));
			}
			setOperand2('');
			setIsResult(false);
		}
	};
	// Объявляем кнопки из массива NUMS, через map()
	return (
		<>
			<div className={styles.calculator}>
				<div className={isResult ? styles.red : styles.white}>
					<span className={styles.span}>{operand1 + operator + operand2}</span>{' '}
				</div>

				<div className={styles.divButton}>
					{NUMS.map((id, index) =>
						index < 3 ? (
							<button onClick={onClickNumber} key={id} className="button">
								{id}
							</button>
						) : (
							true
						),
					)}
				</div>

				<div className={styles.divButton}>
					{NUMS.map((id, index) =>
						index > 2 && index < 6 ? (
							<button onClick={onClickNumber} key={id} className="button">
								{id}
							</button>
						) : (
							true
						),
					)}
				</div>

				<div className={styles.divButton}>
					{NUMS.map((id, index) =>
						index > 5 && index < 10 ? (
							<button onClick={onClickNumber} key={id} className="button">
								{id}
							</button>
						) : (
							true
						),
					)}
				</div>

				<div className={styles.divOperators}>
					{NUMS.map((id, index) =>
						index > 9 ? (
							<button
								onClick={onClickNumber}
								key={id}
								className="buttonOperators"
								id={id}
							>
								{id}
							</button>
						) : (
							true
						),
					)}
				</div>
			</div>
		</>
	);
};
