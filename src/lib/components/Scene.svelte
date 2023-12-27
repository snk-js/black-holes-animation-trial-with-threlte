<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import Ball from './Ball/Ball.svelte';
	import type { GravityType } from '@threlte/rapier';

	let type: GravityType = 'static';

	const config: any = {
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
</script>

<T.PerspectiveCamera position.y={50} position.z={100} makeDefault fov={70} far={10000}>
	<OrbitControls enableZoom={true} target.y={20} />
</T.PerspectiveCamera>
<T.DirectionalLight castShadow position={[8, 20, -3]} />

<Ball
	initialPos={[0, -50, 0]}
	{config}
	{type}
	linearVelocity={[50, 0, 0]}
	userData={{ center: false, id: 1 }}
/>
<Ball
	initialPos={[0, 50, 0]}
	{config}
	{type}
	linearVelocity={[-50, 0, 0]}
	userData={{ center: false, id: 2 }}
/>
<Ball initialPos={[0, 0, 0]} {config} {type} hasAttractor userData={{ center: true }} />
