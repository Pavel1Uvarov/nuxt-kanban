import type { EnumStatus } from '../records.types';

export interface ICard {
	id: string;
	name: string;
	$createdAt: string;
	status: EnumStatus;
}

export interface IColumn {
	id: EnumStatus;
	name: string;
	cards: ICard[];
}
