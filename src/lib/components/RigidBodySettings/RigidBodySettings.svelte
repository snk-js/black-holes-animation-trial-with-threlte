<script lang="ts" context="module">
	const geometry = new SphereGeometry(1);
	const material = new MeshBasicMaterial({ color: 'red' });
</script>

<script lang="ts">
	import { MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';
	import { T, useTask } from '@threlte/core';
	import { Attractor, Collider, type GravityType, useRigidBody } from '@threlte/rapier';
	import type { Config } from '$lib/types/config';
	import { OrbsSettings, orbs } from '$src/store';

	let _orbs = OrbsSettings;

	let reset: (() => void) | undefined;

	let accMult = _orbs.accelerationMultiplier;
	let accIncr = _orbs.accelerationIncrement;

	orbs.subscribe((newSettings) => {
		_orbs = newSettings;
		accMult = newSettings.accelerationMultiplier;
		accIncr = newSettings.accelerationIncrement;
	});

	export let config: Config;
	export let hasAttractor = false;
	export let type: GravityType = 'static';

	const rigidBody = useRigidBody();
	const center = new Vector3(0, 0, 0); // Assuming center is at (0, 0, 0)
	let it = 0;

	useTask((delta) => {
		// Increase velocity for the orbiting rigid bodies
		if (it < 10) {
			if (rigidBody?.userData?.id === 1) {
				rigidBody.setTranslation(new Vector3(0, 50, 0), true);
				it++;
			}
			if (rigidBody?.userData?.id === 2) {
				rigidBody.setTranslation(new Vector3(0, -50, 0), true);
				it++;
			}
		}
		// Increment the acceleration multiplier
		accMult += accIncr * delta;

		// Apply updated orbital velocity for the orbiting rigid bodies
		if (rigidBody?.userData?.id) {
			updateOrbitalVelocity(center, accMult);
		}
	});

	function updateOrbitalVelocity(center: Vector3, multiplier: number) {
		const position = rigidBody?.translation(); // Get the current position
		if (!position) return;

		// Calculate the distance from the center
		const distance = new Vector3(position.x, position.y, position.z).distanceTo(center);

		if (distance > _orbs.maxDistance) {
			// Calculate the direction from the center to the object
			const direction = new Vector3(position.x, position.y, position.z).sub(center).normalize();

			// Set the new position at max distance along the direction
			const newPosition = direction.multiplyScalar(_orbs.maxDistance).add(center);
			rigidBody?.setTranslation(newPosition, true);
		}

		const tangentialDirection = new Vector3(-position.y, position.x, 0).normalize();
		const newVelocityMagnitude =
			Math.sqrt(_orbs.baseAccelerationRate * distance * 200) * multiplier; // Apply the multiplier
		const newVelocity = tangentialDirection.multiplyScalar(newVelocityMagnitude);

		rigidBody?.setLinvel(newVelocity, true);
	}
</script>

<Collider shape="ball" args={[0]} mass={config[type].strength} />
<T.Mesh {geometry} {material} />
{#if hasAttractor}
	<Attractor
		range={config[type].range}
		gravitationalConstant={config[type].gravitationalConstant}
		strength={config[type].strength}
		gravityType={type}
	/>
{/if}
