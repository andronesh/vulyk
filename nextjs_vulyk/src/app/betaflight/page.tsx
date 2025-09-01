"use client";

import InputTextLabeled from "@/components/common/InputTextLabeled";
import { Button } from "@/components/ui/button";
import SerialUtils from "@/lib/bf/serial";
import { useState } from "react";

export default function BetaflightPage() {
	const [serialPort, setSerialPort] = useState<SerialPort>();
	const [serialPortInfo, setSerialPortInfo] = useState<Partial<SerialPortInfo>>();
	const [serialPortConnected, setSerialPortConnected] = useState(false);

	const [typedCommand, setTypedCommand] = useState("");

	const choosePort = async () => {
		SerialUtils.choosePort()
			.then((port) => {
				setSerialPort(port);
				setSerialPortInfo(port.getInfo());
			})
			.catch((error) => {
				console.error(error);
				window.alert("Не вдалося вибрати порт: " + error);
			});
	};

	const connectToPort = async () => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}
		SerialUtils.connectToPort(serialPort)
			.then(() => {
				setSerialPortConnected(true);
			})
			.catch((error) => {
				console.error(`Failed to connect to port: ${serialPortInfo?.usbProductId}`, error);
				window.alert(error);
			});
	};

	const disconnectFromPort = async () => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}
		SerialUtils.disconnectFromPort(serialPort)
			.then(() => {
				setSerialPortConnected(false);
				window.alert("Від'єднано від порту");
			})
			.catch((error) => {
				console.error(`Failed to disconnect from port: ${serialPortInfo?.usbProductId}`, error);
				window.alert(error);
			});
	};

	const executeBfCommand = async () => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}
		await SerialUtils.writeToSerial(serialPort, typedCommand + "\r\n");
		const result = await SerialUtils.readFromSerial(serialPort);
		console.info("Serial output:");
		console.info(result);
		setTypedCommand("");
	};

	return (
		<div className="flex w-full flex-col gap-2">
			<div className="flex w-72 flex-col gap-2">
				<div className="flex w-72 flex-row justify-between">
					<h2 className="text-2xl font-bold">
						Порт {serialPortInfo ? `: ${serialPortInfo.usbProductId}` : ``}
					</h2>
					{!serialPort && <Button onClick={choosePort}>вибрати</Button>}
					{serialPort && !serialPortConnected && <Button onClick={connectToPort}>під'єднатись</Button>}
					{serialPort && serialPortConnected && <Button onClick={disconnectFromPort}>від'єднатись</Button>}
				</div>
				{serialPort && serialPortConnected && (
					<div className="flex w-72 flex-row items-end justify-between">
						<InputTextLabeled
							label="команда"
							name="command"
							value={typedCommand}
							onChange={(event) => setTypedCommand(event.target.value)}
						/>
						<Button onClick={executeBfCommand}>execute</Button>
					</div>
				)}
			</div>
		</div>
	);
}
