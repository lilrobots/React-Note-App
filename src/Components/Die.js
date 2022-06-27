import one from '../images/1.svg';
import two from '../images/2.svg';
import three from '../images/3.svg';
import four from '../images/4.svg';
import five from '../images/5.svg';
import six from '../images/6.svg';

export default function Die(props) {
	function dieImage() {
		let image = "";
		switch (props.value) {
			case 1:
				image = one;
				break;
			case 2:
				image = two;
				break;
			case 3:
				image = three;
				break;
			case 4:
				image = four;
				break;
			case 5:
				image = five;
				break;
			case 6:
				image = six;
				break;
			default:
		}
		return image;
	}
	return (
		<div
			className={`die ${props.isHeld ? 'held' : ''}`}
			onClick={() => props.holdDice(props.id)}
		>
			<img src={dieImage()} alt="" />
		</div>
	);
}
