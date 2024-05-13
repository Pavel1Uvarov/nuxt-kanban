import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

if (process.env.APPWRITE_PROJECT_ID) {
	client
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject(process.env.APPWRITE_PROJECT_ID);
}
else {
	console.error('APPWRITE_PROJECT_ID environment variable is not set');
}

export const account = new Account(client);
export { ID } from 'appwrite';
export const DB = new Databases(client);
export const STORAGE = new Storage(client);
