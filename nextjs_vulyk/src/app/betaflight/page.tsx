"use client";

import InputTextLabeled from "@/components/common/InputTextLabeled";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BetaflightPage() {
	const [serialPort, setSerialPort] = useState<SerialPort>();
	const [serialPortInfo, setSerialPortInfo] = useState<Partial<SerialPortInfo>>();
	const [serialPortConnected, setSerialPortConnected] = useState(false);

	const [typedCommand, setTypedCommand] = useState("");

	const choosePort = async () => {
		navigator.serial
			.requestPort({ filters: [{ usbVendorId: 1155 }] })
			.then((port) => {
				setSerialPort(port);
				setSerialPortInfo(port.getInfo());
				return;
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
		console.info(serialPortInfo);
		serialPort
			.open({ baudRate: 115200 })
			.then(() => {
				setSerialPortConnected(true);
			})
			.catch((error) => {
				console.error(`Failed to connect to port: ${serialPortInfo?.usbProductId}`, error);
				window.alert(error);
			});
	};

	const readFromSerial = async (): Promise<string> => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return new Promise((resolve, reject) => reject("Serial port is not setted, returning"));
		}
		const textDecoder = new TextDecoder();
		const reader = serialPort.readable?.getReader();
		if (!reader) {
			console.error("No readable stream available on serialPort");
			return new Promise((resolve, reject) => reject("No readable stream available on serialPort"));
		}
		let result = "";

		while (true) {
			const { value, done } = await reader.read();
			const textValue = textDecoder.decode(value);

			if (done) {
				console.log("Reader has been closed");
				reader.releaseLock();
				break;
			}
			result += textValue;
			if (textValue.endsWith("# ")) {
				console.warn("----- LAST LINE, releasing reader lock -----");
				reader.releaseLock();
				break;
			}
		}
		return new Promise((resolve) => {
			resolve(result);
		});
	};

	const writeToSerial = async (inputLine: string) => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}

		const textEncoder = new TextEncoder();
		const writer = serialPort.writable?.getWriter();
		if (!writer) {
			console.error("No writable stream available on serialPort");
			return;
		}
		try {
			await writer.write(textEncoder.encode(inputLine));
		} catch (err: any) {
			console.error("Writing to serial:", err.message);
		} finally {
			console.info("Releasing writer lock");
			writer.releaseLock();
		}
	};

	const disconnectFromPort = async () => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}
		serialPort
			.close()
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
		await writeToSerial(typedCommand + "\r\n");
		const result = await readFromSerial();
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
