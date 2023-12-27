<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { World, Debug } from '@threlte/rapier';
	import type { GravityType } from '@threlte/rapier';
	import AdvancedScene from './Scene.svelte';
	import { Pane, Slider, TabGroup, TabPage, Checkbox, Button, Color } from 'svelte-tweakpane-ui';
	import { OrbsSettings, lines, linesSettings, orbs } from '$src/store';
	let reset: (() => void) | undefined;

	let _orbs = OrbsSettings;

	orbs.subscribe((newSettings) => {
		_orbs = newSettings;
	});

	let _lines = linesSettings;

	lines.subscribe((newSettings) => {
		_lines = newSettings;
	});
</script>

<Pane title="Attractor" position="fixed">
	<Button title="Reset the scene" on:click={reset} />
	<TabGroup>
		<TabPage title="Orbs settings">
			<Slider bind:value={_orbs.baseAccelerationRate} label="Strength left" min={0.001} max={3} />
			<Slider
				bind:value={_orbs.accelerationIncrement}
				label="Acceleration Increment"
				min={0.1}
				max={6}
			/>
			<Slider
				bind:value={_orbs.accelerationMultiplier}
				label="Acceleration multiplier"
				min={0.1}
				max={5}
			/>
			<Slider bind:value={_orbs.maxDistance} label="Max Distance" min={4} max={300} />
		</TabPage>
		<TabPage title="Lines">
			<Slider
				bind:value={_lines.lerpPowerMultiplier}
				label="Lerp Power Multiplier"
				min={0.1}
				max={2}
			/>
			<Slider
				bind:value={_lines.deltaMultiplier}
				label="Obrs Delta multiplier"
				min={0.1}
				max={32}
			/>
			<Slider bind:value={_lines.pointsQtd} label="Point Quantity" min={4} max={400} />
			<Color bind:value={_lines.color} label="Color" />
			<Slider bind:value={_lines.stiffness} label="Stiffness" min={0.1} max={30} />
			<Slider bind:value={_lines.damping} label="Damping" min={0.1} max={12} />
			<Slider bind:value={_lines.width} label="Line Width" min={1} max={50} />
			<Slider bind:value={_lines.scaleDown} label="Scale Down" min={0.01} max={4} />
			<Checkbox bind:value={_lines.attenuate} label="Attenuate" />
		</TabPage>
	</TabGroup>
</Pane>

<div>
	<Canvas>
		<World gravity={[0, 0, 0]}>
			<AdvancedScene bind:reset />
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
