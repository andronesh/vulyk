"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BetaflightPage() {
	const [usbDevice, setUsbDevice] = useState<USBDevice>();

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
		if (!usbDevice) return;
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

	// const connectToPort = async () => {
	// 	const lol = await navigator.serial
	// 		.requestPort()
	// 		.then((port) => {
	// 			port.open({ baudRate: 9600 });
	// 			console.info(port.getInfo());
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// };

	return (
		<div className="flex w-72 flex-col gap-2">
			<div>Пристрій {usbDevice ? `: ${usbDevice.productName}` : ` не підключено`}</div>
			<div className="flex w-72 flex-row gap-2">
				<Button onClick={chooseDevice}>вибрати</Button>
				<Button onClick={connectToDevice}>підєднатись</Button>
			</div>
		</div>
	);
}
