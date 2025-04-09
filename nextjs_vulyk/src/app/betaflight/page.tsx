"use client";

import ModelsPanel from "@/components/models/ModelsPanel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BetaflightPage() {
	const [usbDevice, setUsbDevice] = useState<USBDevice>();

	useEffect(() => {
		console.info("navigator: ", navigator);
		if (navigator) {
			// navigator.usb.addEventListener("connect", (e) => handleNewDevice(e.device));
			navigator.usb.addEventListener("connect", handleNewDevice);
		}
		// navigator.usb.addEventListener("disconnect", (e) => this.handleNewDevice(e.device));
	}, []);

	// const handleNewDevice = (device: USBDevice) => {
	const handleNewDevice = (event: USBConnectionEvent) => {
		const device = event.device;
		console.info("handleNewDevice: ", device);
		const info = {
			path: `usb_${device.serialNumber}`,
			displayName: `Betaflight ${device.productName}`,
			vendorId: device.manufacturerName,
			productId: device.productName,
			port: device,
		};

		console.info(info);
	};

	const connectToDrone = async () => {
		// console.info(navigator.usb);
		const device = await navigator.usb.requestDevice({
			filters: [{ vendorId: 0x0483 }], // STMicroelectronics, commonly used in FCs
		});

		await device.open();
		if (device.configuration === null) {
			await device.selectConfiguration(1);
		}
		await device.claimInterface(0);
		setUsbDevice(device);
	};

	return (
		<div className="flex flex-row">
			<Button onClick={connectToDrone}>під'єднатись до дрона</Button>
		</div>
	);
}
