import type { IColumn } from '~/types/kanban/kanban.types';
import { EnumStatus } from '~/types/records.types';

export const KANBAN_DATA: IColumn[] = [
	{
		id: EnumStatus['todo'],
		name: 'Todo',
		cards: [],
	},
	{
		id: EnumStatus['in-progress'],
		name: 'In progress',
		cards: [],
	},
	{
		id: EnumStatus['review'],
		name: 'Review',
		cards: [],
	},
	{
		id: EnumStatus['done'],
		name: 'Done',
		cards: [],
	},
];
