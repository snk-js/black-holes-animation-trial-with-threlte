import type { GravityType } from '@threlte/rapier';

export type Config = Record<
	GravityType,
	{
		type: GravityType;
		strength: number;
		range: number;
		gravitationalConstant: number | undefined;
	}
>;
