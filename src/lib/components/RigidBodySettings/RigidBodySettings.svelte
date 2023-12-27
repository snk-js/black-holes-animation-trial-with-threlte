<script lang="ts" context="module">
	const geometry = new SphereGeometry(1);
	const material = new MeshBasicMaterial({ color: 'red' });
</script>

<script lang="ts">
	import { MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';
	import { T, useTask } from '@threlte/core';
	import { Attractor, Collider, type GravityType, useRigidBody } from '@threlte/rapier';
	import type { Config } from '$lib/types/config';

	export let config: Config;
	export let hasAttractor = false;
	export let type: GravityType = 'static';

	const accelerationRate = 2; // Adjust the rate of acceleration
	const orbitalDecreaseRate = 1000; // Rate at which the distance to the center decreases

	const rigidBody = useRigidBody();

	useTask((delta) => {
		if (rigidBody?.userData?.id === 1 || rigidBody?.userData?.id === 2) {
			updateOrbitalVelocity(rigidBody, accelerationRate);
		}
	});

	function updateOrbitalVelocity(rigidB: typeof rigidBody, rate: number) {
		const { x, y, z } = rigidB?.translation();

		let distanceToCenter = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
		distanceToCenter = Math.max(distanceToCenter - orbitalDecreaseRate, 10); // Ensuring the distance doesn't go below a threshold

		const tangentialDirection = new Vector3(-y, x, 0).normalize();
		const newVelocityMagnitude = Math.sqrt(distanceToCenter) * 100;
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
