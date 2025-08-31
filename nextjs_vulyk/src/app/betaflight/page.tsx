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
				initReader();
			})
			.catch((error) => {
				console.error(`Failed to connect to port: ${serialPortInfo?.usbProductId}`, error);
				window.alert(error);
			});
	};

	const initReader = async () => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}
		const textDecoder = new TextDecoderStream();
		serialPort.readable?.pipeTo(textDecoder.writable);
		const reader = textDecoder.readable.getReader();

		while (true) {
			const { value, done } = await reader.read();
			if (done) {
				console.log("Reader has been closed");
				reader.releaseLock();
				break;
			}
			console.log(value);
			if (value.endsWith("# ")) {
				console.warn("-------- LAST LINE --------");
			}
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

		const textEncoder = new TextEncoder();
		const writer = serialPort.writable?.getWriter();
		if (!writer) {
			console.error("No writable stream available on serialPort");
			return;
		}
		try {
			await writer.write(textEncoder.encode(typedCommand + "\r\n"));
			setTypedCommand("");
		} catch (err: any) {
			console.error("Error entering CLI:", err.message);
		} finally {
			console.info("Releasing writer lock");
			writer.releaseLock();
		}
	};

	return (
		<div className="flex w-72 flex-col gap-2">
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
