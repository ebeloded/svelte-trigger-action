# svelte-trigger-action

A simple utility to trigger CSS animations on elements by calling a function

```svelte
<script>
import { createAnimationTriggerAction } from 'svelte-trigger-action'

// create trigger and action
const { triggerAnimation, animationAction } = createAnimationTriggerAction()

</script>

<button use:animationAction on:click={()=>triggerAnimation('shake')}>
	shake me
</button>
```

[DEMO](https://svelte.dev/repl/6fbaf2115a31423b9e5b989423dce38a?version=3.42.5)


The CSS class that defines the animation can be specified in the following places:

1. When creating trigger and action

```js
const { triggerAnimation, animationAction } = createAnimationTriggerAction('shake') // <- specified here

// in such case, trigger can be called without arguments:
triggerAnimation()

```

2. As a parameter to action:

```svelte
<script>

import { createAnimationTriggerAction } from 'svelte-trigger-action'

// create trigger and action
const { triggerAnimation, animationAction } = createAnimationTriggerAction()

</script>

<button use:animationAction={'shake'} onClick={triggerAnimation}>
	shake me
</button>

```

3. As a parameter to trigger function:

```js
const { triggerAnimation, animationAction } = createAnimationTriggerAction()
triggerAnimation('shake')
```
