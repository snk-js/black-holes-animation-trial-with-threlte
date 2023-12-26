<script lang="ts" context="module">
	const geometry = new SphereGeometry(1);
	const material = new MeshBasicMaterial({ color: 'red' });
</script>

<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Attractor, Collider, RigidBody } from '@threlte/rapier';
	import type { GravityType } from '@threlte/rapier';
	import { Group, MeshBasicMaterial, SphereGeometry } from 'three';
	import Line from '../Line/Line.svelte';

	type Vec3 = [x: number, y: number, z: number];

	type Config = Record<
		GravityType,
		{
			type: GravityType;
			strength: number;
			range: number;
			gravitationalConstant: number | undefined;
		}
	>;

	export let config: Config;
	let ballRef: Group;
	let ballRefPos = { x: 0, y: 0, z: 0 };
	export let initialPos: Vec3 = [0, 50, 0];
	export let hasAttractor = false;
	export let type: GravityType = 'static';
	export let linearVelocity: Vec3 = [0, 0, 0];

	useTask((delta) => {
		if (!ballRef) return;
		ballRefPos = ballRef.children[0].position;
	});
</script>

<T.Group position={initialPos} bind:ref={ballRef}>
	<RigidBody {linearVelocity}>
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
	</RigidBody>
</T.Group>
<T.Group position={initialPos}>
	<Line color="#ff0000" position={ballRefPos} stiffness={1} damping={0.5} width={10}></Line>
</T.Group>
