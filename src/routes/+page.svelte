<script lang="ts">
	import { onMount } from 'svelte';

	import { createAnimationTriggerAction, createTriggerAction } from '$lib';

	const { triggerAnimation, animationAction } = createAnimationTriggerAction();
	const { trigger, triggerAction } = createTriggerAction(async (node, param, triggerParam) => {
		console.log('action callback', node, param, triggerParam);
	});

	onMount(() => {
		trigger('test');
	});

	async function animate() {
		console.log('start shaking');
		await triggerAnimation('shake');
		console.log('stop shaking');
	}
</script>

<button use:animationAction on:click={animate}> shake me </button>

<div use:triggerAction={'hello'}></div>

<style>
	:global(.shake) {
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
</style>
