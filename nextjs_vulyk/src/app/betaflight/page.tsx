"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BetaflightPage() {
	const [serialPort, setSerialPort] = useState<SerialPort>();
	const [serialPortInfo, setSerialPortInfo] = useState<Partial<SerialPortInfo>>();
	const [serialPortConnected, setSerialPortConnected] = useState(false);

	useEffect(() => {
		if (!navigator.serial) {
			window.alert("Ваш браузер не підтримує Web Serial API");
			return;
		}
		if (!navigator.serial.getPorts) {
			window.alert("Ваш браузер не підтримує Web Serial API getPorts");
			return;
		}
		navigator.serial
			.getPorts()
			.then((ports) => {
				for (let i = 0; i < ports.length; i++) {
					console.log("---");
					const portInfo = serialPort?.getInfo();
					console.log(`   Location ID: ${portInfo?.locationId}`);
					console.log(`   Manufacturer: ${portInfo?.manufacturer}`);
					console.log(`   Serial Number: ${portInfo?.serialNumber}`);
					console.log(`   Vendor: ${portInfo?.vendor}`);
					console.log(`   Vendor ID: ${portInfo?.vendorId}`);
					console.log(`   USB vendor ID: ${portInfo?.usbVendorId}`);
					console.log(`   Product: ${portInfo?.product}`);
					console.log(`   Product ID: ${portInfo?.productId}`);
					console.log(`   USB product ID: ${portInfo?.usbProductId}`);
				}
			})
			.catch((error) => {
				console.error("Failed to get available ports:", error);
				window.alert("Не вдалося отримати доступні порти: " + error);
			});
	}, []);

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
			.open({ baudRate: 9600 })
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

	return (
		<div className="flex w-72 flex-col gap-2">
			<div className="flex w-72 flex-col gap-2">
				<div>Порт {serialPortInfo ? `: ${serialPortInfo.usbProductId}` : ` не підключено`}</div>
				<div className="flex w-72 flex-row gap-2">
					{!serialPort && <Button onClick={choosePort}>вибрати</Button>}
					{serialPort && !serialPortConnected && <Button onClick={connectToPort}>під'єднатись</Button>}
					{serialPort && serialPortConnected && <Button onClick={disconnectFromPort}>від'єднатись</Button>}
				</div>
			</div>
		</div>
	);
}
