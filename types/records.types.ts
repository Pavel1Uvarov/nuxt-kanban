export interface IBaseField {
	$createdAt: string;
	$id: string;
}

export interface ICustomer extends IBaseField {
	name: string;
	email: string;
	avatar_url: string;
}

export interface IComment extends IBaseField {
	text: string;
}

export enum EnumStatus {
	'todo' = 'todo',
	'review' = 'review',
	'done' = 'done',
	'archived' = 'archived',
	'in-progress' = 'in-progress',
}

export enum EnumPriority {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export interface IRecord extends IBaseField {
	id: string;
	comments: IComment[];
	members: ICustomer[];
	name: string;
	due_date: string;
	priority: EnumPriority;
	status: EnumStatus;
}
