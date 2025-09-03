const SerialUtils = {
	choosePort: async (): Promise<SerialPort> => {
		try {
			const port = await navigator.serial.requestPort({ filters: [{ usbVendorId: 1155 }] });
			return new Promise((resolve) => resolve(port));
		} catch (error) {
			return new Promise((resolve, reject) => reject(error));
		}
	},

	connectToPort: async (serialPort: SerialPort) => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}
		console.info(serialPort.getInfo());
		await serialPort.open({ baudRate: 115200 });
	},

	disconnectFromPort: async (serialPort: SerialPort) => {
		if (!serialPort) {
			console.warn("Serial port is not setted, returning");
			return;
		}
		await serialPort.close();
	},

	readFromSerial: async (serialPort: SerialPort): Promise<string> => {
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
			const readPromise = reader.read();
			const timeoutPromise = new Promise<{ value: Uint8Array | undefined; done: boolean }>((resolve) =>
				setTimeout(() => resolve({ value: undefined, done: true }), 777),
			);

			const { value, done } = await Promise.race([readPromise, timeoutPromise]);
			const textValue = textDecoder.decode(value);

			if (done) {
				console.log("Reader has been closed");
				reader.releaseLock();
				break;
			}
			result += textValue;
		}
		return new Promise((resolve) => {
			resolve(result);
		});
	},

	writeToSerial: async (serialPort: SerialPort, inputLine: string) => {
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Writing to serial:", err.message);
		} finally {
			console.info("Releasing writer lock");
			writer.releaseLock();
		}
	},
};

export default SerialUtils;
