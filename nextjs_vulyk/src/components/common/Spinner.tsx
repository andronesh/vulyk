type Props = {
	className?: string;
};

export default function Spinner(props: Props) {
	return (
		<div className={`flex flex-row justify-center ${props.className}`}>
			<img src="/spinner.svg" />
		</div>
	);
}
