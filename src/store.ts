import { writable } from 'svelte/store';

// orbs
const baseAccelerationRate = 1 / 3;
const accelerationIncrement = 2;
const accelerationMultiplier = 2;
const maxDistance = 100;

export const OrbsSettings = {
	baseAccelerationRate,
	accelerationIncrement,
	accelerationMultiplier,
	maxDistance
};

export const orbs = writable(OrbsSettings);

const lerpPowerMultiplier = 0.1;
const deltaMultiplier = 8;
const pointsQtd = 50;
const color = '#ff0000';
const stiffness = 1;
const damping = 0.5;
const width = 10;
const scaleDown = 0.2;
const attenuate = false;

export const linesSettings = {
	lerpPowerMultiplier,
	deltaMultiplier,
	pointsQtd,
	color,
	stiffness,
	damping,
	width,
	scaleDown,
	attenuate
};

// lines
export const lines = writable(linesSettings);

export const config = {
	static: {
		type: 'static',
		strength: 1500,
		range: 1000,
		gravitationalConstant: undefined
	},
	linear: {
		type: 'linear',
		strength: 30,
		range: 100,
		gravitationalConstant: undefined
	},
	newtonian: {
		type: 'newtonian',
		strength: 20,
		range: 1000,
		gravitationalConstant: 10
	}
};
