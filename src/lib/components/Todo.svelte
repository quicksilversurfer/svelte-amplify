<script lang="ts">
  import { generateClient } from 'aws-amplify/data';
  import type { Schema } from '@/amplify/data/resource';
  import { onMount } from 'svelte';

  const client = generateClient<Schema>();
  let todos: Schema['Todo']['type'][] = [];

  onMount(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        todos = [...items];
      }
    });

    return () => sub.unsubscribe();
  });

  async function createTodo() {
    await client.models.Todo.create({
      content: window.prompt('Todo content?') || '',
      isDone: false
    });
  }
</script>

<div class="p-4">
  <button 
    class="bg-blue-500 text-white px-4 py-2 rounded"
    on:click={createTodo}>
    Add Todo
  </button>
  
  <ul class="mt-4 space-y-2">
    {#each todos as { id, content }}
      {#key id}
        <li class="p-2 bg-gray-100 rounded">
          {content}
        </li>
      {/key}
    {/each}
  </ul>
</div>