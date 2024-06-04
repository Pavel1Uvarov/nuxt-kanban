import { Client, Account, Databases, Storage, ID } from 'appwrite';

export const useAppWrite = () => {
	const config = useRuntimeConfig();
	const client = new Client();

	if (config.public.APP_WRITE_PROJECT_ID) {
		client
			.setEndpoint('https://cloud.appwrite.io/v1')
			.setProject(config.public.APP_WRITE_PROJECT_ID);
	}
	else {
		console.error('APPWRITE_PROJECT_ID environment variable is not set');
	}

	const account = new Account(client);
	const DB = new Databases(client);
	const STORAGE = new Storage(client);

	return { account, ID, DB, STORAGE };
};
