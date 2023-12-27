<script lang="ts" context="module">
	const geometry = new SphereGeometry(1);
	const material = new MeshBasicMaterial({ color: 'red' });
</script>

<script lang="ts">
	import { MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';
	import { T, useTask } from '@threlte/core';
	import { Attractor, Collider, type GravityType, useRigidBody } from '@threlte/rapier';
	import type { Config } from '$lib/types/config';
	import { onMount } from 'svelte';

	export let config: Config;
	export let hasAttractor = false;
	export let type: GravityType = 'static';

	const accelerationRate = 2; // Adjust the rate of acceleration

	const rigidBody = useRigidBody();
	const maxDistance = 50; // Set your maximum distance
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

		if (rigidBody?.userData?.id === 1 || rigidBody?.userData?.id === 2) {
			updateOrbitalVelocity(rigidBody, accelerationRate, maxDistance, center);
		}
	});

	function updateOrbitalVelocity(
		rigidB: typeof rigidBody,
		rate: number,
		maxDistance: number,
		center: Vector3
	) {
		const position = rigidB?.translation(); // Get the current position
		if (!position) return;

		// Calculate the distance from the center
		const distance = new Vector3(position.x, position.y, position.z).distanceTo(center);

		console.log(position);

		if (distance > maxDistance) {
			// Calculate the direction from the center to the object
			const direction = new Vector3(position.x, position.y, position.z).sub(center).normalize();

			// Set the new position at max distance along the direction
			const newPosition = direction.multiplyScalar(maxDistance).add(center);
			rigidB?.setTranslation(newPosition, true);
		}

		// Calculate the tangential direction
		const tangentialDirection = new Vector3(-position.y, position.x, 0).normalize();
		const newVelocityMagnitude = Math.sqrt(rate * distance * 200); // Adjust this calculation as needed
		const newVelocity = tangentialDirection.multiplyScalar(newVelocityMagnitude);

		rigidB?.setLinvel(newVelocity, true);
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
