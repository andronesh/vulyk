import Image from "next/image";

type Props = {
	className?: string;
};

export default function Spinner(props: Props) {
	return (
		<div className={`flex flex-row justify-center ${props.className}`}>
			<Image src="/spinner.svg" alt="loading indicator" width={300} height={300} />
		</div>
	);
}
