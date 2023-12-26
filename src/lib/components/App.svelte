<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { World, Debug } from '@threlte/rapier';
	import type { GravityType } from '@threlte/rapier';
	import AdvancedScene from './Scene.svelte';
	let reset: (() => void) | undefined;
</script>

<div>
	<Canvas>
		<World gravity={[0, 0, 0]}>
			<AdvancedScene />
			<HTML slot="fallback" transform>
				<p>
					It seems your browser<br />
					doesn't support WASM.<br />
					I'm sorry.
				</p>
			</HTML>
		</World>
	</Canvas>
</div>

<style>
	div {
		height: 100%;
	}
	p {
		font-size: 0.75rem;
		line-height: 1rem;
	}
</style>
