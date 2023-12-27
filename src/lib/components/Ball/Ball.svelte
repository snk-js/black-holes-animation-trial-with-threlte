<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { RigidBody, type GravityType, useFixedJoint } from '@threlte/rapier';
	import { Group, Vector3 } from 'three';
	import Line from '../Line/Line.svelte';
	import RigidBodySettings from '../RigidBodySettings/RigidBodySettings.svelte';
	import type { Config } from '$lib/types/config';

	type Vec3 = [x: number, y: number, z: number];

	let ballRef: Group;
	let ballRefPos = { x: 0, y: 0, z: 0 };

	export let config: Config;
	export let hasAttractor = false;
	export let type: GravityType = 'static';
	export let initialPos: Vec3 = [0, 50, 0];
	export let userData: any = {};
	export let linearVelocity: Vec3 = [0, 0, 0];

	useTask((delta) => {
		if (!ballRef) return;
		ballRefPos = ballRef.children[0].position;
	});
</script>

<T.Group bind:ref={ballRef}>
	<RigidBody {linearVelocity} type="dynamic" {userData}>
		<RigidBodySettings {config} {hasAttractor} {type} />
	</RigidBody>
</T.Group>
<T.Group>
	<Line color="#ff0000" position={ballRefPos} stiffness={1} damping={0.5} width={10}></Line>
</T.Group>
