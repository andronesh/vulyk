"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BetaflightPage() {
	const [usbDevice, setUsbDevice] = useState<USBDevice>();
	const [serialPort, setSerialPort] = useState<SerialPort>();
	const [serialPortInfo, setSerialPortInfo] = useState<Partial<SerialPortInfo>>();

	useEffect(() => {
		if (navigator) {
			navigator.usb.addEventListener("connect", handleNewDevice);
			navigator.usb.addEventListener("disconnect", handleDeviceDisconnect);
		}
	}, []);

	const handleNewDevice = (event: USBConnectionEvent) => {
		const device = event.device;
		setUsbDevice(device);
		console.info("handleNewDevice: ", device);
		const info = {
			path: `usb_${device.serialNumber}`,
			displayName: `Betaflight ${device.productName}`,
			vendorId: device.manufacturerName,
			productId: device.productName,
			port: device,
		};

		console.info(info);
		connectToDevice();
	};

	const handleDeviceDisconnect = (event: USBConnectionEvent) => {
		console.info("handleDeviceDisconnect()", event);
		// await usbDevice?.close();
		setUsbDevice(undefined);
	};

	const chooseDevice = async () => {
		// console.info(navigator.usb);
		const device = await navigator.usb.requestDevice({
			filters: [{ vendorId: 0x0483 }], // STMicroelectronics, commonly used in FCs
		});
		setUsbDevice(device);
	};

	const connectToDevice = () => {
		if (!usbDevice) {
			console.warn("USB device is not setted, returning");
			return;
		}
		usbDevice
			.open()
			.then(() => {
				if (usbDevice.configuration === null) {
					usbDevice.selectConfiguration(1);
				}
				usbDevice.claimInterface(0);
			})
			.catch((error) => {
				console.error(`Failed to connect to device: ${usbDevice.productName}`, error);
				window.alert(error);
			});
	};

	const choosePort = () => {
		navigator.serial
			.requestPort()
			.then((port) => {
				setSerialPort(port);
				setSerialPortInfo(port.getInfo());
				return;
			})
			.catch((error) => {
				console.error(error);
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
				window.alert("До порту підключено");
			})
			.catch((error) => {
				console.error(`Failed to connect to port: ${serialPortInfo?.usbProductId}`, error);
				window.alert(error);
			});
	};

	return (
		<div className="flex w-72 flex-col gap-2">
			<div className="flex w-72 flex-col gap-2">
				<div>Пристрій {usbDevice ? `: ${usbDevice.productName}` : ` не підключено`}</div>
				<div className="flex w-72 flex-row gap-2">
					<Button onClick={chooseDevice}>вибрати</Button>
					<Button onClick={connectToDevice}>підєднатись</Button>
				</div>
			</div>
			<div className="flex w-72 flex-col gap-2">
				<div>Порт {serialPortInfo ? `: ${serialPortInfo.usbProductId}` : ` не підключено`}</div>
				<div className="flex w-72 flex-row gap-2">
					<Button onClick={choosePort}>вибрати</Button>
					<Button onClick={connectToPort}>підєднатись</Button>
				</div>
			</div>
		</div>
	);
}
