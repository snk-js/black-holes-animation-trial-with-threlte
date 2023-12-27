<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
	import { Vector3 } from 'three';
	import { spring } from 'svelte/motion';
	import { lines, linesSettings } from '$src/store';

	let _lines = linesSettings;
	lines.subscribe((newSettings) => {
		_lines = newSettings;
	});

	export let position: { x: number; y: number; z: number };

	let springObject = spring(
		{ x: 0, y: 0, z: 0 },
		{
			stiffness: _lines.stiffness,
			damping: _lines.damping
		}
	);
	let points: Vector3[] = [];
	for (let j = 0; j < _lines.pointsQtd; j++) {
		points.push(new Vector3(0, 0, 0));
	}
	$: springObject.set(position);
	$: {
		if (points[0]) {
			points[0].x = $springObject.x;
			points[0].z = $springObject.z;
			points[0].y = $springObject.y;
			points = points;
		}
	}
	useTask((delta) => {
		let previousPoint = points[0];
		points.forEach((point, i) => {
			if (previousPoint && i > 0) {
				point.lerp(
					previousPoint,
					Math.pow(_lines.lerpPowerMultiplier, delta * _lines.deltaMultiplier)
				);
				previousPoint = point;
			}
		});
		points = points;
	});
</script>

<T.Mesh {...$$restProps}>
	<MeshLineGeometry {points} shape={'taper'} />
	<MeshLineMaterial
		width={_lines.width}
		color={_lines.color}
		scaleDown={_lines.scaleDown}
		attenuate={_lines.attenuate}
	/>
</T.Mesh>
